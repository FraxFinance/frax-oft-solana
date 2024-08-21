// Import necessary functions and classes from Solana SDKs
import assert from 'assert'
import bs58 from 'bs58'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js'

import { getKeypairFromEnvironment, getExplorerLink } from '@solana-developers/helpers'

import { OftTools, OFT_SEED, OftProgram } from '@layerzerolabs/lz-solana-sdk-v2'
import { env } from 'process'

// Import necessary components and types
import { task } from 'hardhat/config'
import { TaskArguments } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'
import { createGetHreByEid } from '@layerzerolabs/devtools-evm-hardhat'
import { addressToBytes32 } from '@layerzerolabs/lz-v2-utilities'
import type { OAppOmniGraphHardhat } from '@layerzerolabs/toolbox-hardhat'

import path from 'path'
import fs from 'fs'
import { toWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters'

import { createSolanaConnectionFactory } from '../common/utils'

task('lz:solana:oft:init', 'Initializes different Endpoint configuration accounts for the OFT Config')
    .addParam('mint', 'The OFT token mint public key')
    .addParam('program', 'The OFT Program id')
    .addParam('eid', 'Solana mainnet or testnet')
    .addParam('oappConfig', 'The solana config file')
    .setAction(async (taskArgs: TaskArguments) => {
        const configPath = path.resolve(taskArgs.oappConfig)

        if (!fs.existsSync(configPath)) {
            console.error(`Config file not found: ${configPath}`)
            return
        }

        const solanaConfig: OAppOmniGraphHardhat = (await import(configPath)).default
        let solanaEid: EndpointId

        const privateKey = process.env.SOLANA_PRIVATE_KEY
        assert(!!privateKey, 'SOLANA_PRIVATE_KEY is not defined in the environment variables.')

        // 1. Setup UMI environment using environment variables (private key and Solana RPC)

        const connectionFactory = createSolanaConnectionFactory()
        const rpcConnection = await connectionFactory(taskArgs.eid)

        // Initialize UMI with the Solana RPC URL and necessary tools
        const umi = createUmi(rpcConnection.rpcEndpoint)

        // Generate a wallet keypair from the private key stored in the environment
        const umiWalletKeyPair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(privateKey))
        const walletKeyPair = toWeb3JsKeypair(umiWalletKeyPair);
        const mintPublicKey = new PublicKey(taskArgs.mint)
        const OFT_PROGRAM_ID = new PublicKey(taskArgs.program)

        // Derive the OFT Config's PDA
        const [oftConfig] = PublicKey.findProgramAddressSync(
            [Buffer.from(OFT_SEED), mintPublicKey.toBuffer()],
            OFT_PROGRAM_ID
        )

        console.log(`⚙️ Initializing configuration accounts for Solana to EVM...`)

        // Reads each configuration specified in the solana.config.ts where the 'from' chain is solana
        for (const peer of solanaConfig.connections) {
            // uses the hardhat runtime to get the evm contract address from deployments to initialize as the peer account on solana
            try {
                const getHreByEid = createGetHreByEid()
                const hre = await getHreByEid(peer.to.eid)
                const peerContract = await hre.deployments.get(peer.to.contractName!)

                // Builds the initialize peer instruction
                const peerTransaction = new Transaction().add(
                    await OftTools.createInitNonceIx(
                        walletKeyPair.publicKey,
                        peer.to.eid,
                        oftConfig,
                        addressToBytes32(peerContract.address)
                    )
                )

                // Sends and confirms the initialize peer instruction
                const peerSignature = await sendAndConfirmTransaction(rpcConnection, peerTransaction, [walletKeyPair], {
                    commitment: `confirmed`,
                })
                const link = getExplorerLink('tx', peerSignature, taskArgs.network)
                console.log(
                    `✅ You initialized the peer account for dstEid ${peer.to.eid}! View the transaction here: ${link}`
                )
            } catch (error) {
                console.log(error)
            }
            // Initializes the send library for the pathway.
            try {
                const initSendLibraryTransaction = new Transaction().add(
                    await OftTools.createInitSendLibraryIx(walletKeyPair.publicKey, oftConfig, peer.to.eid)
                )

                const initSendLibrarySignature = await sendAndConfirmTransaction(
                    rpcConnection,
                    initSendLibraryTransaction,
                    [walletKeyPair],
                    { commitment: `confirmed` }
                )
                console.log(
                    `✅ You initialized the send library for dstEid ${peer.to.eid}! View the transaction here: ${initSendLibrarySignature}`
                )
            } catch (error) {
                console.log(error)
            }
            // Initializes the receive library for the pathway.
            try {
                const initReceiveLibraryTransaction = new Transaction().add(
                    await OftTools.createInitReceiveLibraryIx(walletKeyPair.publicKey, oftConfig, peer.to.eid)
                )

                const initReceiveLibrarySignature = await sendAndConfirmTransaction(
                    rpcConnection,
                    initReceiveLibraryTransaction,
                    [walletKeyPair],
                    { commitment: `confirmed` }
                )
                console.log(
                    `✅ You initialized the receive library for dstEid ${peer.to.eid}! View the transaction here: ${initReceiveLibrarySignature}`
                )
            } catch (error) {
                console.log(error)
            }
            // Initializes the OFT Config Account for the pathway.
            try {
                const initConfigTransaction = new Transaction().add(
                    await OftTools.createInitConfigIx(
                        walletKeyPair.publicKey,
                        oftConfig,
                        peer.to.eid,
                        new PublicKey(peer.config?.sendLibrary!)
                    )
                )

                const initConfigSignature = await sendAndConfirmTransaction(
                    rpcConnection,
                    initConfigTransaction,
                    [walletKeyPair],
                    { commitment: `confirmed` }
                )
                console.log(
                    `✅ You initialized the config for dstEid ${peer.to.eid}! View the transaction here: ${initConfigSignature}`
                )
            } catch (error) {
                console.log(error)
            }
        }
    })

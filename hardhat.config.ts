// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'

import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './tasks/index'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
        tests: 'test/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        ethereum: {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETHEREUM,
            accounts,
        },
        blast: {
            eid: EndpointId.BLAST_V2_MAINNET,
            url: process.env.RPC_URL_BLAST || 'https://rpc.blast.io',
            accounts,
        },
        base: {
            eid: EndpointId.BASE_V2_MAINNET,
            url: process.env.RPC_URL_BASE || 'https://base.drpc.org',
            accounts,
        },
        fraxtal: {
            eid: EndpointId.FRAXTAL_V2_MAINNET,
            url: process.env.RPC_URL_FRAXTAL || 'https://fraxtal.drpc.org',
            accounts,
        },
        mode: {
            eid: EndpointId.MODE_V2_MAINNET,
            url: process.env.RPC_URL_MODE || 'https://mode.drpc.org',
            accounts,
        },
        metis: {
            eid: EndpointId.METIS_V2_MAINNET,
            url: process.env.RPC_URL_METIS || 'https://metis.drpc.org',
            accounts,
        },
        sei: {
            eid: EndpointId.SEI_V2_MAINNET,
            url: process.env.RPC_URL_SEI || 'https://cosmological-ancient-knowledge.sei-pacific.quiknode.pro/70aaf606421e2e248dda1e371a3c7e29b8c3e530',
            accounts,
        },
        xlayer: {
            eid: EndpointId.XLAYER_V2_MAINNET,
            url: process.env.RPC_URL_XLAYER || 'https://rpc.xlayer.tech',
        },
        arbitrum: {
            eid: EndpointId.ARBITRUM_V2_MAINNET,
            url: process.env.RPC_URL_ARBITRUM || 'https://arb1.drpc.org',
        }
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config

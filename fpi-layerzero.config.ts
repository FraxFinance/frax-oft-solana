import { EndpointId } from '@layerzerolabs/lz-definitions'
import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { DVN_CONFIG_SEED, EXECUTOR_CONFIG_SEED, ExecutorProgram } from '@layerzerolabs/lz-solana-sdk-v2'
import { PublicKey } from '@solana/web3.js'

const lzDVNProgramId = new PublicKey('HtEYV4xB4wvsj5fgTkcfuChYpvGYzgzwvNhgDZQNh7wW')
const lzDVNConfigAccount = PublicKey.findProgramAddressSync([Buffer.from(DVN_CONFIG_SEED, 'utf8')], lzDVNProgramId)[0]

const horizenDVNConfigAccount = new PublicKey('HR9NQKK1ynW9NzgdM37dU5CBtqRHTukmbMKS7qkwSkHX')

/**
 * When specifying ULNs, program ID must be used
 */
const ulnProgramID = '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH'

/**
 * When specifying executors, executor config address must be used
 */
const [executorConfigPublicKey] = PublicKey.findProgramAddressSync(
    [Buffer.from(EXECUTOR_CONFIG_SEED, 'utf8')],
    ExecutorProgram.PROGRAM_ID
)
const executorAddress = executorConfigPublicKey.toBase58()

const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'FPIOFT',
}

const blastContract: OmniPointHardhat = {
    eid: EndpointId.BLAST_V2_MAINNET,
    contractName: 'FPIOFT',
}

const ethereumContract: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'FPIOFTAdapter',
}

const fraxtalContract: OmniPointHardhat = {
    eid: EndpointId.FRAXTAL_V2_MAINNET,
    contractName: 'FPIOFT',
}

const metisContract: OmniPointHardhat = {
    eid: EndpointId.METIS_V2_MAINNET,
    contractName: 'FPIOFT',
}

const modeContract: OmniPointHardhat = {
    eid: EndpointId.MODE_V2_MAINNET,
    contractName: 'FPIOFT',
}

const seiContract: OmniPointHardhat = {
    eid: EndpointId.SEI_V2_MAINNET,
    contractName: 'FPIOFT',
}

const solanaContract: OmniPointHardhat = {
    eid: EndpointId.SOLANA_V2_MAINNET,
    address: 'BG9oPj76NRPbj1e1GbL4imnqo9VD7W2ukpnRFSWtq5CA',
}

const xlayerContract: OmniPointHardhat = {
    eid: EndpointId.XLAYER_V2_MAINNET,
    contractName: 'FPIOFT',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: ethereumContract,
        },
        {
            contract: baseContract,
        },
        {
            contract: blastContract,
        },
        {
            contract: fraxtalContract,
        },
        {
            contract: metisContract,
        },
        {
            contract: modeContract,
        },
        {
            contract: seiContract,
        },
        {
            contract: solanaContract,
        },
        {
            contract: xlayerContract,
        }
    ],
    connections: [
        {
            from: solanaContract,
            to: ethereumContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        confirmations: 0,
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: baseContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: blastContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: fraxtalContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: metisContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: modeContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: seiContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: xlayerContract,
            config: {
                sendLibrary: ulnProgramID,
                receiveLibraryConfig: {
                    receiveLibrary: ulnProgramID,
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        executor: executorAddress,
                        maxMessageSize: 10000,
                    },
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        optionalDVNThreshold: 0,
                        requiredDVNs: [lzDVNConfigAccount.toString(), horizenDVNConfigAccount.toString()],
                        optionalDVNs: [],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 65000,
                        value: 0,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 50000,
                        value: 0,
                    },
                ],
            },
        },
    ],
}

export default config

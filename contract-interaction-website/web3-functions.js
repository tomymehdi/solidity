// npx hardhat node
// npx hardhat run --network localhost scripts/deploy_upgradeable_adminbox.js
// copied from hardhat/artifacts/contracts/AdminBox.sol/AdminBox.json [abi]
const ethAbi = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "version",
            "type": "uint8"
          }
        ],
        "name": "Initialized",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "ValueChanged",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "admin",
            "type": "address"
          }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  

const ethContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
const ethAddressWithBalance = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
const ethPrivateAddressWithBalance = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"
const toAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

$(document).ready(async function(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
    console.log("ready provider: ", provider)

    const signer = provider.getSigner(ethAddressWithBalance)
    console.log("ready signer: ", signer)

    const balance = await provider.getBalance(ethAddressWithBalance)
    console.log("ready balance ethAddressWithBalance: ", balance)
    console.log("ready balance ethAddressWithBalance: ", ethers.utils.formatEther(balance, 18))

    const wallet = new ethers.Wallet(ethPrivateAddressWithBalance)
    let walletSigner = wallet.connect(provider)
    console.log("ready walletSigner: ", walletSigner)

    const balance2 = await provider.getBalance(ethContractAddress)
    console.log("ready balance ethContractAddress: ", balance2)
    console.log("ready balance ethContractAddress: ", ethers.utils.formatEther(balance2, 18))

	await readMethods(provider)
    await stateChangeMethods(provider, signer, walletSigner)
    await readMethods(provider)
    // await listenContractEvents()
    // await queryHistoricEvents()
    // await signingMessages()
})

async function readMethods(provider) {
    // check AdminBox contract
    const check = await provider.getCode(ethContractAddress)
    console.log("readMethods check: ", check)

    // get AdminBox contract
    const ethContract = new ethers.Contract(ethContractAddress, ethAbi, provider)
    console.log("readMethods ethContract: ", ethContract)

    // read method retrieve AdminBox
    const retrieve = await ethContract.retrieve()
    console.log("readMethods retrieve(): ", retrieve)
    console.log("readMethods retrieve(): ", retrieve.toString())
}

async function stateChangeMethods(provider, signer, walletSigner) {
    // get AdminBox contract
    const ethContract = new ethers.Contract(ethContractAddress, ethAbi, provider)
    console.log("stateChangeMethods ethContract: ", ethContract)

    // The DAI Contract is currently connected to the Provider,
    // which is read-only. You need to connect to a Signer, so
    // that you can pay to send state-changing transactions.
    const ethWithSigner = ethContract.connect(signer)
    // signer.estimateGas = async(transaction) => {
    //   console.log("stateChangeMethods ethWithSigner transaction: ", transaction)
    //   return "500000";
    // }
    console.log("stateChangeMethods ethWithSigner: ", ethWithSigner)

    await ethWithSigner.store(36)
    const retrieve = await ethContract.retrieve()
    console.log("readMethods retrieve(): ", retrieve)
    console.log("readMethods retrieve(): ", retrieve.toString())

    const ethWithWalletSigner = ethContract.connect(walletSigner)
    // walletSigner.estimateGas = async(transaction) => {
    //   console.log("stateChangeMethods ethWithWalletSigner estimateGas: ", transaction)
    //   return "500000";
    // }
    console.log("stateChangeMethods ethWithWalletSigner: ", ethWithWalletSigner)

    await ethWithWalletSigner.store(444)
    const retrieve2 = await ethContract.retrieve()
    console.log("readMethods retrieve(): ", retrieve2)
    console.log("readMethods retrieve(): ", retrieve2.toString())

    const tx = {
      to: toAddress,
      value: ethers.utils.parseEther("0.01"),
    };
    await signer.sendTransaction(tx);

    const tx2 = {
      to: toAddress,
      value: ethers.utils.parseEther("0.02"),
    };
    await walletSigner.sendTransaction(tx2);
}

async function listenContractEvents() {
    const ethContract = await getContract()

    // Receive an event when ANY transfer occurs
    ethContract.on("Transfer", (from, to, amount, event) => {
        console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`)
        // The event object contains the verbatim log data, the
        // EventFragment and functions to fetch the block,
        // transaction and receipt and event functions
    })

    // A filter for when a specific address receives tokens
    myAddress = ethAddressWithBalance
    filter = ethContract.filters.Transfer(null, myAddress)
    // {
    //   address: 'eth.tokens.ethers.eth',
    //   topics: [
    //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //     null,
    //     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
    //   ]
    // }

    // Receive an event when that filter occurs
    ethContract.on(filter, (from, to, amount, event) => {
        // The to will always be "address"
        console.log(`I got ${ formatEther(amount) } from ${ from }.`)
    })
}

async function queryHistoricEvents() {
    const ethContract = await getContract()

    // Get the address of the Signer
    myAddress = await Signer.getInstance().getAddress()
    // '0x8ba1f109551bD432803012645Ac136ddd64DBA72'

    // Filter for all token transfers from me
    filterFrom = ethContract.filters.Transfer(myAddress, null)

    // Filter for all token transfers to me
    filterTo = ethContract.filters.Transfer(null, myAddress)

    // List all transfers sent from me in a specific block range
    await ethContract.queryFilter(filterFrom, 9843470, 9843480)


    // List all transfers sent in the last 10,000 blocks
    await ethContract.queryFilter(filterFrom, -10000)

    // List all transfers ever sent to me
    await ethContract.queryFilter(filterTo)
}

async function signingMessages() {
    // To sign a simple string, which are used for
    // logging into a service, such as CryptoKitties,
    // pass the string in.
    signature = await Signer.getInstance().signMessage("Hello World")

    // This string is 66 characters long
    message = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

    // This array representation is 32 bytes long
    messageBytes = ethers.utils.arrayify(message)

    // To sign a hash, you most often want to sign the bytes
    signature = await Signer.getInstance().signMessage(messageBytes)
}
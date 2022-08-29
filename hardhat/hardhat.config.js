/** @type import('hardhat/config').HardhatUserConfig */


require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-truffle5");


const { alchemyApiKey, mnemonic } = require('./secrets.json');

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};

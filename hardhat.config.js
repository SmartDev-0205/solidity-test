require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        }
      },
    ]
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [process.env.PRIVATEKEY]
    },
    fantomtestnet: {
      url: "https://rpc.testnet.fantom.network",
      accounts: [process.env.PRIVATEKEY]
    },
    eth: {
      url: "https://ethereum-rpc.icicbchain.org",
      accounts: [process.env.PRIVATEKEY]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [process.env.PRIVATEKEY]
    }
  }
};
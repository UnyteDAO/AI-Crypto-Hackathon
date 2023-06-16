// hardhat.config.js
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: process.env.GOERLI_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.MUMBAI_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    shibuya: {
      url: "https://evm.shibuya.astar.network",
      accounts: [process.env.PRIVATE_KEY],
    },
    astar: {
      url: "https://astar-mainnet.g.alchemy.com/v2/fplVxEKlCS0sSnG4SJJ-L10PfI5TuOw3",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
};
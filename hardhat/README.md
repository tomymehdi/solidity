# Compile
`npx hardhat compile`

# Local env
`npx hardhat node`

# Deploy
`npx hardhat run --network localhost scripts/deploy.js`
Remember to stop node and hardhat clean if conflicting contracts

# Console local env
`npx hardhat console --network localhost`

# Run script
`npx hardhat run --network localhost ./scripts/index.js`

# Run chai tests
`npx hardhat test`

# Testnet
`npx hardhat console --network rinkeby`

# Deploy testnet
`npx hardhat run --network rinkeby scripts/deploy.js`

# Console testnet
`npx hardhat console --network rinkeby`

Documentation bugs: 
- Calling truffle to test https://docs.openzeppelin.com/learn/writing-automated-tests?pref=hardhat
- Missing info of adding require("@nomiclabs/hardhat-truffle5"); to hardhat.config.js https://docs.openzeppelin.com/learn/writing-automated-tests?pref=hardhat
- HardHat recommends using node version with LTS -> currently v16.17.0 (https://nodejs.org/en/download/)
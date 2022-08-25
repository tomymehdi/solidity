# Compile
`npx hardhat compile`

# Local env
`npx hardhat node`

# Deploy
`npx hardhat run --network localhost scripts/deploy.js`

# Console local env
`npx hardhat console --network localhost`

# Run script
`npx hardhat run --network localhost ./scripts/index.js`

# Run chai tests
`npx hardhat test`

Documentation bugs: 
- Calling truffle to test https://docs.openzeppelin.com/learn/writing-automated-tests?pref=hardhat
- Missing info of adding require("@nomiclabs/hardhat-truffle5"); to hardhat.config.js https://docs.openzeppelin.com/learn/writing-automated-tests?pref=hardhat
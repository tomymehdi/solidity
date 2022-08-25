# Compile code
`npx truffle compile`

# Run testing cli
`npx ganache-cli --deterministic`

# Deploy / Upgrade contracts
`npx truffle migrate --network development`
`npx truffle compile --all && npx truffle migrate --reset`

# Truffle console
`npx truffle console --network development`

# Execute scripts with Truffle
`npx truffle exec --network development ./scripts/index.js`

# Execute tests with Truffle
`npx truffle test`

# Testnet
`https://dashboard.alchemy.com/`

# Fresh Mnemonic
`npx mnemonics`

# Deploy to testnet
`npx truffle migrate --network rinkeby`
`npx truffle console --network rinkeby`
// migrations/5_deploy_upgradeable_adminbox.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const AdminBox = artifacts.require('AdminBox');

module.exports = async function (deployer) {
  await deployProxy(AdminBox, ['0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E'], { deployer, initializer: 'initialize' });
};
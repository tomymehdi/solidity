// scripts/deploy_upgradeable_adminbox.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const AdminBox = await ethers.getContractFactory('AdminBox');
  console.log('Deploying AdminBox...');
  const adminBox = await upgrades.deployProxy(AdminBox, ['0x5fbdb2315678afecb367f032d93f642f64180aa3'], { initializer: 'initialize' });
  await adminBox.deployed();
  console.log('AdminBox deployed to:', adminBox.address);
}

main();
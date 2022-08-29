// scripts/deploy_upgradeable_adminbox.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const AdminBox = await ethers.getContractFactory('AdminBox');
  console.log('Deploying AdminBox...');
  const adminBox = await upgrades.deployProxy(AdminBox, ['0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'], { initializer: 'initialize' });
  await adminBox.deployed();
  console.log('AdminBox deployed to:', adminBox.address);
}

main();
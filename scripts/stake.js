const { ethers } = require("hardhat");

async function main() {
  console.log("Iniciando demonstracao de stake de tokens...");

  const [deployer] = await ethers.getSigners();

  console.log("Conta usada:", deployer.address);

  // 1. Deploy do token ERC-20
  const DocToken = await ethers.getContractFactory("DocToken");
  const docToken = await DocToken.deploy(1000000);
  await docToken.waitForDeployment();

  const docTokenAddress = await docToken.getAddress();

  console.log("DocToken deployado em:", docTokenAddress);

  // 2. Deploy do contrato de staking
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(docTokenAddress);
  await staking.waitForDeployment();

  const stakingAddress = await staking.getAddress();

  console.log("Staking deployado em:", stakingAddress);

  // 3. Financiar o contrato de staking com 10.000 DOC para recompensas
  const rewardAmount = ethers.parseUnits("10000", 18);

  const fundTx = await docToken.mint(stakingAddress, 10000);
  await fundTx.wait();

  console.log("Staking financiado com 10000 DOC para recompensas.");

  // 4. Aprovar o contrato Staking para movimentar 100 DOC
  const stakeAmount = ethers.parseUnits("100", 18);

  const approveTx = await docToken.approve(stakingAddress, stakeAmount);
  await approveTx.wait();

  console.log("Aprovado o uso de 100 DOC pelo contrato Staking.");

  // 5. Fazer stake de 100 DOC
  const stakeTx = await staking.stake(stakeAmount);
  await stakeTx.wait();

  console.log("Stake de 100 DOC realizado com sucesso!");

  // 6. Consultar dados do staking
  const stakedBalance = await staking.stakedBalance(deployer.address);
  const totalStaked = await staking.totalStaked();
  const reward = await staking.calculateReward(deployer.address);

  console.log("--------------------------------------");
  console.log("Saldo em stake:", ethers.formatUnits(stakedBalance, 18), "DOC");
  console.log("Total em stake:", ethers.formatUnits(totalStaked, 18), "DOC");
  console.log("Recompensa calculada:", ethers.formatUnits(reward, 18), "DOC");
  console.log("--------------------------------------");

  console.log("Demonstracao de stake finalizada!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
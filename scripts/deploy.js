const { ethers } = require("hardhat");

async function main() {
  console.log("Iniciando deploy do DocVerifyDAO...");

  const [deployer] = await ethers.getSigners();

  console.log("Conta usada no deploy:", deployer.address);

   // 1. Deploy do token ERC-20
  const DocToken = await ethers.getContractFactory("DocToken");
  const docToken = await DocToken.deploy(1000000);
  await docToken.waitForDeployment();

  const docTokenAddress = await docToken.getAddress();
  console.log("DocToken deployado em:", docTokenAddress);

   // 2. Deploy do NFT ERC-721
  const DocumentNFT = await ethers.getContractFactory("DocumentNFT");
  const documentNFT = await DocumentNFT.deploy();
  await documentNFT.waitForDeployment();

  const documentNFTAddress = await documentNFT.getAddress();
  console.log("DocumentNFT deployado em:", documentNFTAddress);

  // 3. Deploy do Staking
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(docTokenAddress);
  await staking.waitForDeployment();

  const stakingAddress = await staking.getAddress();
  console.log("Staking deployado em:", stakingAddress);

  // 4. Deploy da DAO
  const SimpleDAO = await ethers.getContractFactory("SimpleDAO");
  const simpleDAO = await SimpleDAO.deploy(docTokenAddress);
  await simpleDAO.waitForDeployment();

  const simpleDAOAddress = await simpleDAO.getAddress();
  console.log("SimpleDAO deployado em:", simpleDAOAddress);

  // 5. Deploy do Oracle
  // Feed ETH/USD da Chainlink na Sepolia
  const ethUsdFeedSepolia = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

  const PriceOracle = await ethers.getContractFactory("PriceOracle");
  const priceOracle = await PriceOracle.deploy(ethUsdFeedSepolia);
  await priceOracle.waitForDeployment();

  const priceOracleAddress = await priceOracle.getAddress();
  console.log("PriceOracle deployado em:", priceOracleAddress);

  // 6. Financiar o contrato de staking com tokens para recompensa
  const rewardAmount = 10000;

  const mintTx = await docToken.mint(stakingAddress, rewardAmount);
  await mintTx.wait();

  console.log("Staking financiado com", rewardAmount, "DOC para recompensas.");

  console.log("\nDeploy finalizado com sucesso!");
  console.log("--------------------------------------");
  console.log("DocToken:", docTokenAddress);
  console.log("DocumentNFT:", documentNFTAddress);
  console.log("Staking:", stakingAddress);
  console.log("SimpleDAO:", simpleDAOAddress);
  console.log("PriceOracle:", priceOracleAddress);
  console.log("--------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
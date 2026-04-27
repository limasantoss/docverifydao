const { ethers } = require("hardhat");

async function main() {
  console.log("Iniciando demonstracao de mint de NFT...");

  const [deployer] = await ethers.getSigners();

  console.log("Conta usada:", deployer.address);

  // Deploy do contrato NFT
  const DocumentNFT = await ethers.getContractFactory("DocumentNFT");
  const documentNFT = await DocumentNFT.deploy();
  await documentNFT.waitForDeployment();

  const documentNFTAddress = await documentNFT.getAddress();

  console.log("DocumentNFT deployado em:", documentNFTAddress);

  // URI simulada do documento
  const documentURI = "https://docverifydao.example/documento-001.json";

  // Mint do NFT
  const mintTx = await documentNFT.mintDocument(deployer.address, documentURI);
  await mintTx.wait();

  console.log("NFT mintado com sucesso!");

  // Consultas para validar o NFT
  const owner = await documentNFT.ownerOf(1);
  const tokenURI = await documentNFT.tokenURI(1);
  const totalMinted = await documentNFT.totalMinted();

  console.log("--------------------------------------");
  console.log("Token ID:", 1);
  console.log("Owner do NFT:", owner);
  console.log("Token URI:", tokenURI);
  console.log("Total mintado:", totalMinted.toString());
  console.log("--------------------------------------");

  console.log("Demonstracao de mint de NFT finalizada!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
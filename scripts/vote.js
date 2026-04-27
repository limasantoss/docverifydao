const { ethers } = require("hardhat");

async function main() {
  console.log("Iniciando demonstracao de votacao na DAO...");

  const [deployer] = await ethers.getSigners();

  console.log("Conta usada:", deployer.address);

  // 1. Deploy do token ERC-20
  const DocToken = await ethers.getContractFactory("DocToken");
  const docToken = await DocToken.deploy(1000000);
  await docToken.waitForDeployment();

  const docTokenAddress = await docToken.getAddress();

  console.log("DocToken deployado em:", docTokenAddress);

  // 2. Deploy da DAO usando o endereco do token
  const SimpleDAO = await ethers.getContractFactory("SimpleDAO");
  const simpleDAO = await SimpleDAO.deploy(docTokenAddress);
  await simpleDAO.waitForDeployment();

  const simpleDAOAddress = await simpleDAO.getAddress();

  console.log("SimpleDAO deployado em:", simpleDAOAddress);

  // 3. Criar uma proposta
  const description = "Aprovar registro inicial de documento digital no DocVerifyDAO";
  const durationInMinutes = 10;

  const createProposalTx = await simpleDAO.createProposal(description, durationInMinutes);
  await createProposalTx.wait();

  console.log("Proposta criada com sucesso!");

  // 4. Consultar proposta antes do voto
  let proposalBefore = await simpleDAO.getProposal(1);

  console.log("--------------------------------------");
  console.log("Proposta antes do voto:");
  console.log("Descricao:", proposalBefore[0]);
  console.log("Votos a favor:", ethers.formatUnits(proposalBefore[1], 18), "DOC");
  console.log("Votos contra:", ethers.formatUnits(proposalBefore[2], 18), "DOC");
  console.log("Existe:", proposalBefore[4]);
  console.log("--------------------------------------");

  // 5. Votar a favor
  const voteTx = await simpleDAO.vote(1, true);
  await voteTx.wait();

  console.log("Voto SIM registrado com sucesso!");

  // 6. Consultar proposta depois do voto
  let proposalAfter = await simpleDAO.getProposal(1);

  console.log("--------------------------------------");
  console.log("Proposta depois do voto:");
  console.log("Descricao:", proposalAfter[0]);
  console.log("Votos a favor:", ethers.formatUnits(proposalAfter[1], 18), "DOC");
  console.log("Votos contra:", ethers.formatUnits(proposalAfter[2], 18), "DOC");
  console.log("Existe:", proposalAfter[4]);
  console.log("--------------------------------------");

  console.log("Demonstracao de votacao na DAO finalizada!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
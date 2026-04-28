const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DocVerifyDAO", function () {
  let owner;
  let user;
  let docToken;
  let documentNFT;
  let staking;
  let simpleDAO;

  beforeEach(async function () {
     [owner, user] = await ethers.getSigners();

    const DocToken = await ethers.getContractFactory("DocToken");
    docToken = await DocToken.deploy(1000000);
    await docToken.waitForDeployment();

    const DocumentNFT = await ethers.getContractFactory("DocumentNFT");
    documentNFT = await DocumentNFT.deploy();
    await documentNFT.waitForDeployment();

    const docTokenAddress = await docToken.getAddress();

    const Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(docTokenAddress);
    await staking.waitForDeployment();

    const SimpleDAO = await ethers.getContractFactory("SimpleDAO");
    simpleDAO = await SimpleDAO.deploy(docTokenAddress);
    await simpleDAO.waitForDeployment();
  });

  it("deve criar o token ERC-20 com nome, simbolo e supply inicial corretos", async function () {
    expect(await docToken.name()).to.equal("DocVerify Token");
    expect(await docToken.symbol()).to.equal("DOC");

    const ownerBalance = await docToken.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.parseUnits("1000000", 18));
  });

  it("deve mintar um NFT de documento com tokenURI correto", async function () {
    const uri = "https://docverifydao.example/documento-001.json";

    await documentNFT.mintDocument(owner.address, uri);

    expect(await documentNFT.ownerOf(1)).to.equal(owner.address);
    expect(await documentNFT.tokenURI(1)).to.equal(uri);
    expect(await documentNFT.totalMinted()).to.equal(1);
  });

  it("deve permitir approve e stake de tokens DOC", async function () {
    const stakingAddress = await staking.getAddress();

    await docToken.mint(stakingAddress, 10000);

    const stakeAmount = ethers.parseUnits("100", 18);

    await docToken.approve(stakingAddress, stakeAmount);
    await staking.stake(stakeAmount);

    expect(await staking.stakedBalance(owner.address)).to.equal(stakeAmount);
    expect(await staking.totalStaked()).to.equal(stakeAmount);
  });

  it("deve criar proposta e registrar voto na DAO", async function () {
    const description = "Aprovar registro inicial de documento digital no DocVerifyDAO";

    await simpleDAO.createProposal(description, 10);

    const proposalBefore = await simpleDAO.getProposal(1);

    expect(proposalBefore[0]).to.equal(description);
    expect(proposalBefore[1]).to.equal(0);
    expect(proposalBefore[2]).to.equal(0);
    expect(proposalBefore[4]).to.equal(true);

    await simpleDAO.vote(1, true);

    const proposalAfter = await simpleDAO.getProposal(1);

    expect(proposalAfter[1]).to.equal(ethers.parseUnits("1000000", 18));
    expect(proposalAfter[2]).to.equal(0);
  });

  it("deve bloquear voto duplicado na DAO", async function () {
    const description = "Aprovar registro inicial de documento digital no DocVerifyDAO";

    await simpleDAO.createProposal(description, 10);

    await simpleDAO.vote(1, true);

    await expect(simpleDAO.vote(1, true)).to.be.revertedWith("Already voted");
  });
});
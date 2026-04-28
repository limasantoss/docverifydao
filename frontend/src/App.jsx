import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const CONTRACTS = {
  docToken: "0x1dcb477f671b3c3bF3d89255C828933e3Fc991a2",
  documentNFT: "0x1fEf44F206c15242D832EafD77d469CdE4B9e47B",
  staking: "0x031e35EE1EdAfEfb448292A57190962695D23D5d",
  simpleDAO: "0x7E842847A27084F9C6A77309A6F757EAE982B639",
  priceOracle: "0xa1a8E48d5417FcbD288dEC5cC99d2f632BF46F90",
};

const documentNFTAbi = [
  "function mintDocument(address to, string memory uri) external returns (uint256)",
];

const docTokenAbi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
];

const stakingAbi = [
  "function stake(uint256 amount) external",
];

const simpleDAOAbi = [
  "function vote(uint256 proposalId, bool support) external",
];

const priceOracleAbi = [
  "function getLatestPrice() external view returns (int256)",
  "function getDecimals() external view returns (uint8)",
  "function getDescription() external view returns (string memory)",
];

function App() {
  const [account, setAccount] = useState("");
  const [documentUri, setDocumentUri] = useState("https://docverifydao.example/documento-001.json");
  const [stakeAmount, setStakeAmount] = useState("100");
  const [proposalId, setProposalId] = useState("1");
  const [oraclePrice, setOraclePrice] = useState("");
  const [logs, setLogs] = useState([]);

  const addLog = (type, message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((oldLogs) => [{ time, type, message }, ...oldLogs]);
  };

  const getSigner = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask não encontrada.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getSigner();
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        addLog("ERRO", "MetaMask não encontrada no navegador.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      addLog("SUCCESS", `Carteira conectada: ${accounts[0]}`);
    } catch (error) {
      addLog("ERRO", error.message);
    }
  };

  const mintNFT = async () => {
    try {
      const signer = await getSigner();
      const userAddress = await signer.getAddress();

      const nft = new ethers.Contract(
        CONTRACTS.documentNFT,
        documentNFTAbi,
        signer
      );

      const tx = await nft.mintDocument(userAddress, documentUri);
      addLog("PENDING", "Transação de mint enviada...");

      await tx.wait();
      addLog("SUCCESS", "NFT de documento mintado com sucesso.");
    } catch (error) {
      addLog("ERRO", error.shortMessage || error.message);
    }
  };

  const stakeTokens = async () => {
    try {
      const signer = await getSigner();

      const amount = ethers.parseUnits(stakeAmount, 18);

      const token = new ethers.Contract(
        CONTRACTS.docToken,
        docTokenAbi,
        signer
      );

      const staking = new ethers.Contract(
        CONTRACTS.staking,
        stakingAbi,
        signer
      );

      const approveTx = await token.approve(CONTRACTS.staking, amount);
      addLog("PENDING", "Approve enviado para o contrato de staking...");

      await approveTx.wait();
      addLog("SUCCESS", "Approve confirmado.");

      const stakeTx = await staking.stake(amount);
      addLog("PENDING", "Transação de stake enviada...");

      await stakeTx.wait();
      addLog("SUCCESS", `${stakeAmount} DOC enviados para staking.`);
    } catch (error) {
      addLog("ERRO", error.shortMessage || error.message);
    }
  };

  const vote = async (support) => {
    try {
      const signer = await getSigner();

      const dao = new ethers.Contract(
        CONTRACTS.simpleDAO,
        simpleDAOAbi,
        signer
      );

      const tx = await dao.vote(Number(proposalId), support);
      addLog("PENDING", "Voto enviado para a DAO...");

      await tx.wait();
      addLog("SUCCESS", support ? "Voto SIM registrado." : "Voto NÃO registrado.");
    } catch (error) {
      addLog("ERRO", error.shortMessage || error.message);
    }
  };

  const readOracle = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const oracle = new ethers.Contract(
        CONTRACTS.priceOracle,
        priceOracleAbi,
        provider
      );

      const price = await oracle.getLatestPrice();
      const decimals = await oracle.getDecimals();
      const description = await oracle.getDescription();

      const formattedPrice = Number(price) / 10 ** Number(decimals);

      setOraclePrice(`${description}: $${formattedPrice.toFixed(2)}`);
      addLog("SUCCESS", "Preço ETH/USD consultado via Chainlink.");
    } catch (error) {
      addLog("ERRO", error.shortMessage || error.message);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="logo">✓</div>
          <div>
            <h1>DocVerify</h1>
            <p>MVP - Trabalho  Web3 </p>
          </div>
        </div>

        <button className="primary-button" onClick={connectWallet}>
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </header>

      <main className="container">
        <section className="info-panel">
          <div>
            <h2>Network</h2>
            <p>Sepolia Testnet</p>
            <span>Chain ID: 11155111</span>
          </div>

          <div className="address-list">
            <p><strong>DocToken:</strong> {CONTRACTS.docToken}</p>
            <p><strong>DocumentNFT:</strong> {CONTRACTS.documentNFT}</p>
            <p><strong>Staking:</strong> {CONTRACTS.staking}</p>
            <p><strong>SimpleDAO:</strong> {CONTRACTS.simpleDAO}</p>
            <p><strong>PriceOracle:</strong> {CONTRACTS.priceOracle}</p>
          </div>
        </section>

        <section className="grid">
          <div className="card">
            <div className="card-header">1. Mint Document NFT</div>
            <div className="card-body">
              <label>Document URI</label>
              <input
                value={documentUri}
                onChange={(event) => setDocumentUri(event.target.value)}
              />
              <button className="blue-button" onClick={mintNFT}>
                 Mint NFT
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">2. Stake DOC Tokens</div>
            <div className="card-body">
              <label>Amount</label>
              <input
                value={stakeAmount}
                onChange={(event) => setStakeAmount(event.target.value)}
              />
              <button className="blue-button" onClick={stakeTokens}>
                Stake
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">3. DAO Governance</div>
            <div className="card-body">
              <label>Proposal ID</label>
              <input
                value={proposalId}
                onChange={(event) => setProposalId(event.target.value)}
              />
              <div className="button-row">
                <button className="green-button" onClick={() => vote(true)}>
                  Vote Yes
                </button>
                <button className="red-button" onClick={() => vote(false)}>
                  Vote No
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">4. Oracle</div>
            <div className="card-body">
              <label>ETH/USD Price</label>
              <div className="price-box">
                {oraclePrice || "Clique para consultar"}
              </div>
              <button className="blue-button" onClick={readOracle}>
                Read Oracle
              </button>
            </div>
          </div>

          <div className="card log-card">
            <div className="card-header">5. Status / Transaction Log</div>
            <div className="card-body">
              {logs.length === 0 ? (
                <p className="empty-log">Nenhuma ação executada ainda.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, index) => (
                      <tr key={index}>
                        <td>{log.time}</td>
                        <td>
                          <span className={`badge ${log.type.toLowerCase()}`}>
                            {log.type}
                          </span>
                        </td>
                        <td>{log.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>DocVerify</span>
        <span> Atividade NÍVEL AVANÇADO 2 de 3 - Protocolo completo</span>
        <a
          href="https://sepolia.etherscan.io/address/0x1dcb477f671b3c3bF3d89255C828933e3Fc991a2"
          target="_blank"
          rel="noreferrer"
        >
      
        </a>
      </footer>
    </div>
  );
}

export default App;
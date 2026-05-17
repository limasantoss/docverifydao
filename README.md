# DocVerifyDAO

Protocolo descentralizado para registro, autenticação, rastreabilidade e governança de documentos digitais usando blockchain.

## Visão geral

O DocVerifyDAO é um MVP Web3 que combina token fungível, NFT, staking, governança e oráculo para demonstrar um fluxo completo de autenticação e acompanhamento de documentos digitais em blockchain. O projeto utiliza a rede Sepolia para demonstração das funcionalidades on-chain e integração Web3 com carteira.

## Problema resolvido pelo protocolo

O protocolo busca resolver o problema de registro, autenticação, rastreabilidade e governança de documentos digitais. Em fluxos tradicionais, documentos podem sofrer alterações sem trilha confiável de auditoria, depender de bases centralizadas e ter processos pouco transparentes para validação e decisão. No DocVerifyDAO, o registro do documento pode ser representado como NFT, a interação econômica e de governança utiliza token fungível, e a consulta de dados externos é demonstrada por meio de um oráculo.

## Funcionalidades

- Registro de documentos com NFT ERC-721
- Token DOC em padrão ERC-20 para staking, recompensas e governança
- Contrato de staking com bloqueio de tokens e cálculo de recompensa
- DAO simplificada para criação e votação de propostas
- Integração com oráculo Chainlink para leitura do preço ETH/USD
- Frontend React com ethers.js e MetaMask para demonstração das operações

## Arquitetura geral

```text
Usuário / MetaMask
        ↓
Frontend React + ethers.js
        ↓
Contratos na Sepolia
├── DocToken — ERC-20
├── DocumentNFT — ERC-721
├── Staking — bloqueio de DOC e recompensas
├── SimpleDAO — criação e votação de propostas
└── PriceOracle — leitura ETH/USD via Chainlink
        ↓
Chainlink ETH/USD Price Feed
```

## Justificativa dos padrões ERC

### ERC-20

O padrão ERC-20 foi usado para o token DOC porque ele representa um ativo fungível. Isso permite utilizar a mesma unidade de valor para staking, distribuição de recompensas e poder de participação na governança.

### ERC-721

O padrão ERC-721 foi usado para os documentos digitais porque cada documento precisa ser único, rastreável e associado a uma URI com seu metadado próprio. Esse modelo se encaixa melhor em ativos não fungíveis do que em um token fungível.

## Tecnologias utilizadas

- Solidity ^0.8.x
- Hardhat
- OpenZeppelin
- ethers.js
- React + Vite
- MetaMask
- Chainlink
- Sepolia Testnet
- Slither
- Mythril

## Contratos implantados na Sepolia

| Contrato | Função no protocolo | Endereço | Sepolia Etherscan |
| --- | --- | --- | --- |
| DocToken | Token ERC-20 para staking, recompensas e governança | `0x1dcb477f671b3c3bF3d89255C828933e3Fc991a2` | https://sepolia.etherscan.io/address/0x1dcb477f671b3c3bF3d89255C828933e3Fc991a2 |
| DocumentNFT | NFT ERC-721 para representar documentos digitais únicos | `0x1fEf44F206c15242D832EafD77d469CdE4B9e47B` | https://sepolia.etherscan.io/address/0x1fEf44F206c15242D832EafD77d469CdE4B9e47B |
| Staking | Bloqueio de DOC e distribuição de recompensas | `0x031e35EE1EdAfEfb448292A57190962695D23D5d` | https://sepolia.etherscan.io/address/0x031e35EE1EdAfEfb448292A57190962695D23D5d |
| SimpleDAO | Criação e votação de propostas de governança | `0x7E842847A27084F9C6A77309A6F757EAE982B639` | https://sepolia.etherscan.io/address/0x7E842847A27084F9C6A77309A6F757EAE982B639 |
| PriceOracle | Consulta do preço ETH/USD via Chainlink | `0xa1a8E48d5417FcbD288dEC5cC99d2f632BF46F90` | https://sepolia.etherscan.io/address/0xa1a8E48d5417FcbD288dEC5cC99d2f632BF46F90 |

## Instalação

1. Instale as dependências da raiz do projeto:

```bash
npm install
```

2. Instale as dependências do frontend:

```bash
cd frontend
npm install
```

## Testes

Os testes automatizados dos contratos são executados com Hardhat:

```bash
npx hardhat test
```

Também é possível usar o script da raiz:

```bash
npm test
```

## Deploy em testnet

O deploy do MVP foi realizado na rede Sepolia. O script principal de deploy é:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

As variáveis necessárias devem ser definidas em um arquivo `.env`, tomando como base o `.env.example`:

- `SEPOLIA_RPC_URL`
- `PRIVATE_KEY`

## Integração Web3

O frontend React/Vite utiliza ethers.js e MetaMask para demonstrar:

- conexão da carteira
- mint de NFT de documento
- approve e stake de tokens DOC
- votação na DAO
- leitura do preço ETH/USD via Chainlink

## Auditoria e segurança

O projeto possui evidências de validação e auditoria nos arquivos:

- `audit/hardhat-report.txt`
- `audit/slither-report.txt`
- `audit/mythril-report.txt`
- `audit/Relatorio_Auditoria_Doc.pdf`

Principais medidas e mecanismos presentes no MVP:

- Solidity ^0.8.x com proteções nativas contra overflow em operações aritméticas
- `Ownable` para controle de acesso administrativo
- `ReentrancyGuard` no contrato de staking
- testes automatizados com Hardhat

## Observação sobre o oráculo

O contrato `PriceOracle` consome o feed ETH/USD da Chainlink na Sepolia e o frontend permite consultar esse valor. Nesta versão MVP, o oráculo é demonstrado como integração de leitura externa, sem alterar dinamicamente a fórmula de recompensa do staking.

## Entregáveis da tarefa

A entrega final do projeto é composta por:

- relatório técnico em PDF
- link do GitHub do projeto: https://github.com/limasantoss/docverifydao
- vídeo demonstrativo de 5 a 10 minutos
- relatório de auditoria

## Aviso

Este projeto possui finalidade educacional e não é destinado ao uso em ambiente de produção.

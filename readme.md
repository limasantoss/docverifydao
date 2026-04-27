# DocVerifyDAO

## 1. Visão Geral

O **DocVerifyDAO** é um MVP  de protocolo descentralizado desenvolvido para a tarefa da Unidade 1, Capítulo 5 — Desenvolvimento de Protocolo Web3 Completo com Deploy em Testnet.

O objetivo do projeto é demonstrar a integração entre:

- Token ERC-20
- NFT ERC-721
- Contrato de Staking
- Governança simplificada / DAO
- Oráculo Chainlink
- Integração Web3 com ethers.js
- Deploy em testnet Sepolia
- Testes com Hardhat
- Auditoria com Hardhat, Slither e Mythril

Este projeto tem finalidade educacional e foi desenvolvido como MVP , não sendo destinado ao uso em produção.

---

## 2. Problema

Em sistemas tradicionais, documentos digitais podem ser copiados, alterados ou compartilhados sem uma prova pública e verificável de registro.

Isso dificulta a validação da autenticidade e da integridade de um documento.

O DocVerifyDAO propõe um modelo simples em blockchain onde documentos digitais podem ser representados por NFTs, permitindo registro, rastreabilidade e verificação pública em uma rede descentralizada.

---

## 3. Solução Proposta

A solução proposta utiliza um conjunto de contratos inteligentes modulares:

- Um token ERC-20 chamado **DOC**
- Um NFT ERC-721 para representar documentos digitais
- Um contrato de staking para bloqueio de tokens e geração de recompensas
- Uma DAO simplificada para criação de propostas e votação
- Um oráculo Chainlink para consulta do preço ETH/USD
- Scripts Web3 com ethers.js para demonstrar as interações principais

---

## 4. Arquitetura

```txt
Usuário
│
▼
Scripts Web3 com ethers.js
│
├─ deploy.js
├─ mintNFT.js
├─ stake.js
└─ vote.js
│
▼
Contratos Inteligentes na Sepolia
│
├─ DocToken.sol
│  └─ Token ERC-20 usado para staking, recompensa e governança
│
├─ DocumentNFT.sol
│  └─ NFT ERC-721 que representa um documento digital registrado
│
├─ Staking.sol
│  └─ Contrato para bloquear tokens DOC e gerar recompensa simples
│
├─ SimpleDAO.sol
│  └─ Contrato de governança com criação de proposta e votação
│
└─ PriceOracle.sol
   └─ Consulta preço ETH/USD via Chainlink


   5. Contratos
DocToken.sol

Contrato responsável pelo token ERC-20 do protocolo.

Nome: DocVerify Token
Símbolo: DOC
Padrão: ERC-20
Biblioteca: OpenZeppelin
Uso: staking, recompensas e governança
DocumentNFT.sol

Contrato responsável por registrar documentos digitais como NFTs.

Padrão: ERC-721
Cada NFT representa um documento único
Utiliza tokenURI para armazenar metadados
Possui controle de acesso com Ownable
Staking.sol

Contrato responsável pelo staking de tokens DOC.

Funcionalidades:

Depositar tokens DOC
Calcular recompensa simples
Sacar tokens bloqueados
Resgatar recompensa
Proteção com ReentrancyGuard
SimpleDAO.sol

Contrato de governança simplificada.

Funcionalidades:

Criar propostas
Votar a favor ou contra
Usar saldo DOC como poder de voto
Impedir voto duplicado
PriceOracle.sol

Contrato responsável pela integração com oráculo Chainlink.

Funcionalidades:

Consultar o preço ETH/USD
Consultar descrição do feed
Consultar casas decimais do feed
Demonstrar consumo de dado externo em smart contract
6. Justificativa dos padrões ERC
ERC-20

O padrão ERC-20 foi utilizado para representar o token fungível do protocolo, chamado DOC.

Tokens fungíveis são adequados para representar unidades iguais entre si, funcionando como moeda interna, recompensa e participação no staking/governança.

ERC-721

O padrão ERC-721 foi escolhido para representar documentos digitais como NFTs.

Como cada documento registrado deve ser único, o ERC-721 é mais adequado do que um token fungível. Cada NFT possui um identificador próprio e pode apontar para metadados relacionados ao documento.

7. Tecnologias Utilizadas
Solidity ^0.8.x
Hardhat
OpenZeppelin
ethers.js
Chainlink Data Feeds
Sepolia Testnet
Slither
Mythril
Docker
Node.js
8. Instalação

Clone o repositório:

git clone COLE_AQUI_O_LINK_DO_REPOSITORIO

Entre na pasta:

cd docverifydao

Instale as dependências:

npm install
9. Configuração de ambiente

Crie um arquivo .env na raiz do projeto com:

SEPOLIA_RPC_URL=SUA_RPC_DA_SEPOLIA
PRIVATE_KEY=SUA_PRIVATE_KEY_DE_TESTE


10. Compilação
Para compilar os contratos:
npx hardhat compile
Resultado obtido no projeto:
Compiled 25 Solidity files successfully

11. Testes
Para executar os testes:
npx hardhat test
Resultado obtido:
DocVerifyDAO
  ✔ deve criar o token ERC-20 com nome, simbolo e supply inicial corretos
  ✔ deve mintar um NFT de documento com tokenURI correto
  ✔ deve permitir approve e stake de tokens DOC
  ✔ deve criar proposta e registrar voto na DAO
  ✔ deve bloquear voto duplicado na DAO

5 passing

Os testes validam:
Criação do token ERC-20
Mint de NFT
Staking de tokens
Criação de proposta na DAO
Bloqueio contra voto duplicado
12. Scripts Web3

Os scripts foram criados com ethers.js e Hardhat.
Deploy local
npx hardhat run scripts/deploy.js
Esse script faz deploy dos contratos:
DocToken
DocumentNFT
Staking
SimpleDAO
PriceOracle

Além disso, ele financia o contrato de staking com tokens DOC para recompensas.
Mint de NFT
npx hardhat run scripts/mintNFT.js
Esse script demonstra:
Deploy local do DocumentNFT
Execução de mintDocument
Consulta de ownerOf
Consulta de tokenURI
Consulta de totalMinted
Stake de tokens
npx hardhat run scripts/stake.js

Esse script demonstra:
Deploy local do DocToken
Deploy local do Staking
Aprovação com approve
Execução de stake
Consulta de stakedBalance
Consulta de totalStaked
Votação na DAO
npx hardhat run scripts/vote.js

Esse script demonstra:
Deploy local do DocToken
Deploy local da SimpleDAO
Criação de proposta
Consulta dos votos iniciais
Votação a favor
Consulta dos votos após a votação
13. Deploy em Testnet

O deploy final foi realizado na rede Sepolia.

Comando utilizado:

npx hardhat run scripts/deploy.js --network sepolia
Endereços dos contratos
Contrato	Endereço	Explorer
DocToken	0x1dcb477f671b3c3bF3d89255C828933e3Fc991a2	https://sepolia.etherscan.io/address/0x1dcb477f671b3c3bF3d89255C828933e3Fc991a2

DocumentNFT	0x1fEf44F206c15242D832EafD77d469CdE4B9e47B	https://sepolia.etherscan.io/address/0x1fEf44F206c15242D832EafD77d469CdE4B9e47B

Staking	0x031e35EE1EdAfEfb448292A57190962695D23D5d	https://sepolia.etherscan.io/address/0x031e35EE1EdAfEfb448292A57190962695D23D5d

SimpleDAO	0x7E842847A27084F9C6A77309A6F757EAE982B639	https://sepolia.etherscan.io/address/0x7E842847A27084F9C6A77309A6F757EAE982B639

PriceOracle	0xa1a8E48d5417FcbD288dEC5cC99d2f632BF46F90	https://sepolia.etherscan.io/address/0xa1a8E48d5417FcbD288dEC5cC99d2f632BF46F90
14. Oráculo Chainlink

O contrato PriceOracle.sol utiliza o feed ETH/USD da Chainlink na rede Sepolia.

Feed utilizado:

0x694AA1769357215DE4FAC081bf1f309aDC325306

Funções principais:

getLatestPrice()
getDecimals()
getDescription()
getVersion()

Resultado de teste obtido anteriormente:

getDescription() → ETH / USD
getDecimals() → 8
getLatestPrice() → 231700811544

Interpretação:

231700811544 / 10^8 = 2317.00811544 USD

Preço aproximado do ETH no momento do teste:

US$ 2.317,00
15. Segurança

Medidas aplicadas:

Uso de Solidity ^0.8.x
Uso de OpenZeppelin
Uso de Ownable para controle de acesso
Uso de ReentrancyGuard no contrato Staking
Uso de require para validação de entradas
Uso de eventos para rastreabilidade
Testes automatizados com Hardhat
Auditoria com Slither e Mythril
16. Auditoria

A pasta audit/ contém os relatórios gerados:

audit/
├─ hardhat-report.txt
├─ slither-report.txt
├─ mythril-report.txt
└─ Staking.bytecode.txt
Hardhat

O Hardhat foi utilizado para executar testes automatizados.

Resultado:

5 passing
Slither

O Slither foi utilizado para análise estática dos contratos Solidity.

Resumo:

Foram analisados 26 contratos com 101 detectores.
Foram encontrados 21 resultados.
Parte dos alertas está relacionada a bibliotecas da OpenZeppelin.
Nos contratos próprios, os principais pontos foram:
uso de block.timestamp
sugestão de variáveis immutable
retorno parcial ignorado no oráculo
alerta benigno relacionado ao _safeMint

Os alertas foram registrados como pontos de atenção e recomendações de melhoria.
Mythril
O Mythril foi executado via Docker sobre o bytecode compilado do contrato Staking.sol.
O Staking foi escolhido por ser um contrato sensível do projeto, pois movimenta tokens, calcula recompensas e executa saque.

Resumo dos alertas:

SWC-110: Exception State — Medium
SWC-116: Dependência de block.timestamp — Low
SWC-101: Possível problema aritmético — High

Análise:

O uso de block.timestamp ocorre no cálculo simples de recompensa e não é usado como fonte de aleatoriedade.
Os contratos utilizam Solidity ^0.8.x, que possui proteção nativa contra overflow e underflow.
Os alertas foram documentados como pontos de atenção para evolução futura do MVP.
17. Fluxos demonstrados

O projeto demonstra os seguintes fluxos:

1. Deploy dos contratos
2. Mint de NFT
3. Stake de tokens DOC
4. Criação de proposta na DAO
5. Votação com poder baseado em saldo DOC
6. Consulta de preço ETH/USD via oráculo
7. Testes automatizados
8. Auditoria simples
18. Limitações do MVP

Este projeto é um MVP . Portanto, algumas funcionalidades foram mantidas simples:
20. Conclusão
O DocVerifyDAO cumpre o objetivo de demonstrar um protocolo Web3 completo em formato de MVP .
O projeto integra token ERC-20, NFT ERC-721, staking, governança simplificada, oráculo Chainlink, scripts Web3 com ethers.js, deploy em testnet Sepolia, testes automatizados e auditoria simples.
A implementação foi mantida simples para facilitar a compreensão e a demonstração dos conceitos estudados.
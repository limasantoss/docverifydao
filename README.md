# DocVerifyDAO

 Protocolo descentralizado para registro, autenticação e governança de documentos digitais via blockchain.

## Visão Geral
O DocVerifyDAO é um MVP que integra padrões de tokens, staking e governança para garantir a imutabilidade e rastreabilidade de documentos. O projeto utiliza a rede Sepolia para demonstração das funcionalidades Web3.

## Funcionalidades
- Registro de Documentos: Utiliza o padrão ERC-721 para representar cada documento como um NFT único.
- Token Nativo: Token ERC-20 (DOC) utilizado para staking e governança.
- Staking: Contrato para bloqueio de tokens e recebimento de recompensas.
- Governança: DAO simplificada para criação e votação de propostas.
- Oráculo: Integração com Chainlink para consulta de preço ETH/USD em tempo real.

## Tecnologias
- Linguagem: Solidity 0.8.x
- Framework: Hardhat
- Bibliotecas: OpenZeppelin, Ethers.js
- Rede: Sepolia Testnet
- Segurança: Slither, Mythril


## Instalação e Testes
1. Instalar dependências:
   npm install

2. Compilar contratos:
   npx hardhat compile

3. Executar testes unitários:
   npx hardhat test

## Segurança
Os contratos foram submetidos a testes automatizados e análises via Slither e Mythril. Medidas como ReentrancyGuard e controle de acesso Ownable foram implementadas.

## Aviso
Este projeto possui finalidade puramente educacional e não é destinado ao uso em ambiente de produção.

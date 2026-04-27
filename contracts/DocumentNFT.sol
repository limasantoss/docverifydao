// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DocumentNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    event DocumentMinted(
        address indexed to,
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor() 
        ERC721("DocVerify Document", "DOCDOC") 
        Ownable(msg.sender) 
    {}

    function mintDocument(address to, string memory uri) external onlyOwner returns (uint256) {
        require(to != address(0), "Invalid address");
        require(bytes(uri).length > 0, "Empty URI");

        _tokenIdCounter += 1;
        uint256 newTokenId = _tokenIdCounter;

        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, uri);

        emit DocumentMinted(to, newTokenId, uri);

        return newTokenId;
    }

    function totalMinted() external view returns (uint256) {
        return _tokenIdCounter;
    }
}
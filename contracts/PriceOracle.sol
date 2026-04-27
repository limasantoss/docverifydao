// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract PriceOracle {
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        require(priceFeedAddress != address(0), "Invalid price feed address");
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function getLatestPrice() external view returns (int256) {
        (
            ,
            int256 price,
            ,
            ,
            
        ) = priceFeed.latestRoundData();

        return price;
    }

    function getDecimals() external view returns (uint8) {
        return priceFeed.decimals();
    }

    function getDescription() external view returns (string memory) {
        return priceFeed.description();
    }

    function getVersion() external view returns (uint256) {
        return priceFeed.version();
    }
}
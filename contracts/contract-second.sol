// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.0 <0.9.0;

/**
 * @title SecondTokenAvgPrice
 * @dev Brent Jeremy
 * @date  15:39 25 jan 2022
 */
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
struct MonthPrice {
    uint8 settingCount;
    uint256 sumPrice;
}

contract SecondTokenAvgPrice is Ownable {
    /// Token address to set when we deploy

    address public tokenAddres;

    // Day price , If user set price we set price on this mapping
    mapping(uint32 => uint256) dayPrices;

    // Month price , If user set price we add price and counter for current month
    mapping(uint8 => MonthPrice) monthPrices;

    constructor(address initTokenAddress) {
        require(
            initTokenAddress != address(0),
            "Please set correct token address"
        );
        tokenAddres = initTokenAddress;
        console.log("owner address : ", msg.sender);
    }

    function getPrice() external view returns (uint256) {
        uint32 day = getDay();
        return dayPrices[day];
    }

    function setPrice(uint256 price) external onlyOwner {
        console.log("Setting address : ", msg.sender);
        uint32 day = getDay();
        dayPrices[day] = price;
        uint8 month = getMonth();
        monthPrices[month].sumPrice += price;
        monthPrices[month].settingCount += 1;
    }

    function getMonthAvgPrice(uint8 monthIndex)
        external
        view
        returns (uint256)
    {
        MonthPrice memory currentMonthPrice = monthPrices[monthIndex];
        if (currentMonthPrice.settingCount == 0) return 0;
        else return currentMonthPrice.sumPrice / currentMonthPrice.settingCount;
    }

    function getDay() internal view returns (uint32) {
        uint256 chainStartTime = block.timestamp;
        uint8 day = uint8(chainStartTime / 1 days);
        return day;
    }

    function getMonth() internal view returns (uint8) {
        uint256 chainStartTime = block.timestamp;
        uint8 month = uint8((chainStartTime / 1 days) % 365) / 30 + 1;
        return month;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract rewardToken is ERC20 {
    constructor(address _addr) ERC20("MyToken", "MTK") {
        _mint(_addr, 100000000000000000 * 10 ** decimals());
    }

     function mint(address addr, uint256 _amount) public {
        _mint(addr,_amount);
    }
}
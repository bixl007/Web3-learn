// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZodCoin is ERC20 {
    uint256 public number;

    constructor() ERC20("ZodCoin", "ZOD") {}
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
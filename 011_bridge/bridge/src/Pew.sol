// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Pew is ERC20, Ownable {
    constructor() ERC20("Pew", "PEW") Ownable(msg.sender) {}

    function mint(address _to, uint256 amount) public onlyOwner {
        _mint(_to, amount);
    }

}

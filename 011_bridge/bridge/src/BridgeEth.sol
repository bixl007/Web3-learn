// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.13;
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeEth is Ownable {
    constructor() Ownable(msg.sender) {
    }

    function withdraw() public {

    }

    function burn() public {

    }

    function burnedOnOtherSide() public onlyOwner {

    }
}
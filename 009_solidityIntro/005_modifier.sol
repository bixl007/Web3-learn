// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Storage {
    address public owner;
    uint256 number;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }

    function add(uint a) public onlyOwner {
        number = number + a;
    }

    function subtract(uint a) public onlyOwner {
        number = number - a;
    }

    function getNumber() public view returns (uint) {
        return number;
    }
}
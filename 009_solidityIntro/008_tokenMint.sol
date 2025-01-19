// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract XCoin {
    address public owner;
    uint public totalSupply;
    mapping(address => uint) public balance;

    constructor() {
        owner = msg.sender;
    }

    function mint(uint amount) public {
        require(owner == msg.sender);
        balance[owner] += amount;
        totalSupply += amount;
    }

    function mintTo(uint amount, address to) public {
        require(owner == msg.sender);
        balance[to] += amount;
        totalSupply += amount;
    }

    function transfer(uint amount, address to) public {
        uint existingBalance = balance[msg.sender];
        require(existingBalance >= amount);
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }
}

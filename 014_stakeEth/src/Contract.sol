// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract StakingContract { 

    mapping(address => uint) stakes;
    uint public totalStake;

    constructor() {

    }

    function stake(uint _amount) public payable {
        require(_amount > 0);
        require(_amount == msg.value);
        stakes[msg.sender] += _amount;
        totalStake += _amount;
    }

    function unstake(uint _amount) public payable {
        require(stakes[msg.sender] >= _amount);
        payable (msg.sender).transfer(_amount / 2);
        totalStake -= _amount;
        stakes[msg.sender] -= _amount;
    }
}

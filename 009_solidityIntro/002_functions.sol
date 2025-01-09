// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Sum {
    uint256 num = 0;

    constructor(uint256 _num) {
        num = _num;
    }

    function add(uint256 _value) public {
        num += _value;
    }

    function getValue() public view returns (uint256) {
        return num;
    }
}

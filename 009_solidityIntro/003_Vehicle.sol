// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Vehicle {
    string public brand;

    constructor(string memory _brand) {
        brand = _brand;
    }

    function description() public virtual returns (string memory) {
        return "Hii, I am a vehicle";
    }
}



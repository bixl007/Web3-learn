// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "./003_Vehicle.sol";

contract Truck is Vehicle {
    uint numWheels;

    constructor(string memory _brand, uint _numWheels) Vehicle(_brand) {
        numWheels = _numWheels;
    }

    function description() public pure override returns (string memory) {
        return "Hii, I am a Truck";
    }
}

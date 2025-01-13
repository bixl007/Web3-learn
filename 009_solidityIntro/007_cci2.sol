// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface IStorage {
    function getNum() external view returns (uint256);
    function add() external;
}

contract Contract2 {
    constructor() {}

    function proxyAdd() public {
        IStorage(0xd9145CCE52D386f254917e481eB44e9943F39138).add();
    }

    function proxyGet() public view returns (uint) {
        uint value = IStorage(0xd9145CCE52D386f254917e481eB44e9943F39138)
            .getNum();
        return value;
    }
}

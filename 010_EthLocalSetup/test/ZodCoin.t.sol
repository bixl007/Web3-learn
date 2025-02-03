// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/ZodCoin.sol";

contract TestCounter is Test {
    ZodCoin c;

    function setUp() public {
        c = new ZodCoin();
    }

    function testMint() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "OK");
    }
}

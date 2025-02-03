// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/Counter.sol";

contract TestCounter is Test {
    Counter c;

    function setUp() public {
        c = new Counter(1);
    }

    function testInc() public {
        c.increment();
        assertEq(c.getNum(), 2, "Incremented"); 
    }

    function testDec() public {
        c.decrement();
        assertEq(c.getNum(), 0, "Decremented"); 
    }

    function testFailDec() public {
        c.decrement();
        c.decrement();
    }
}

// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/OrcaCoin.sol";

contract OrcaCoinTest is Test {
    OrcaCoinContract orcaCoin;

    function setUp() public {
        orcaCoin = new OrcaCoinContract(address(this));
    }

    function testInitialSupply() public view {
        assert(orcaCoin.totalSupply() == 0);
    }

    function test_Revert_When_Mint_NotAllowed() public {
        vm.startPrank(0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5);
        vm.expectRevert();
        orcaCoin.mint(0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5, 10);
    }

    function testMint() public {
        orcaCoin.mint(0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5, 10);
        assert(
            orcaCoin.balanceOf(0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5) == 10
        );
    }

    function testChangeStakingContract() public {
        orcaCoin.updateStakingContract(
            0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5
        );
        vm.startPrank(0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5);
        orcaCoin.mint(0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5, 10);
        assert(
            orcaCoin.balanceOf(0xF6b422bC8d2Cb0823BBd6943b5673c8d8F15B8c5) == 10
        );
    }
}

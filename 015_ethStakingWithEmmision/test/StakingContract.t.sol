// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/StakingContract.sol";

contract StakingContractTest is Test {
    StakingContract stakingContract;

    function setUp() public {
        stakingContract = new StakingContract();
    }

    function testStake() public {
        stakingContract.stake{value: 200}();
        assert(stakingContract.balanceOf(address(this)) == 100);
    }

    function testUnstake() public {
        stakingContract.stake{value: 200}();
        stakingContract.unstake(100);
        assert(stakingContract.balanceOf(address(this)) == 100);
    }

    function test_Revert_When_Unstake_TooMuch() public {
        stakingContract.stake{value: 200}();
        vm.expectRevert();
        stakingContract.unstake(300);
    }

    function testGetRewards() public {
        uint value = 1 ether;
        stakingContract.stake{value: value}();
        vm.warp(block.timestamp + 1);
        uint rewards = stakingContract.getRewards(address(this));
        assert(rewards == 1 ether);
    }

    function testComplexGetRewards() public {
        uint value = 1 ether;
        stakingContract.stake{value: value}();
        vm.warp(block.timestamp + 1);
        stakingContract.stake{value: value}();
        vm.warp(block.timestamp + 1);
        uint rewards = stakingContract.getRewards(address(this));
        assert(rewards == 3 ether);
    }

    function testClaimRewards() public {
        uint value = 1 ether;
        stakingContract.stake{value: value}();
        vm.warp(block.timestamp + 1);
        uint before = address(this).balance;
        stakingContract.claimRewards();
        uint afterBal = address(this).balance;
        assert(afterBal > before);
    }
}

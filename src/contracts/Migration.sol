// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Migration {
    address public owner;
    uint public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    function setCompleted(uint complete) public onlyOwner {
        last_completed_migration = complete;
    }
    function upgrade(address new_address) public onlyOwner {
        require(new_address != address(0), "Invalid address");
        Migration upgraded = Migration(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}

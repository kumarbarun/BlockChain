// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract migration{
    address public owner;
    uint public last_completed_migration;

    constructor() public{
        owner=msg.sender;
    }

    modifier restricted(){
        if(msg.sender==owner) _;
    }

    function setcompleted(uint completed) public restricted{
        require(msg.sender == owner);
        last_completed_migration=completed;
    }

    function upgrade(address new_address) public restricted {
        migration upgraded=migration(new_address);
        upgraded.setcompleted(last_completed_migration);
    }
}
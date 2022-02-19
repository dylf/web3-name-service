// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    // Name storage
    mapping(string => address) public domains;

    // Simple string record storage
    mapping(string => string) public records;

    constructor() {
        console.log("Domains contract constructor.");
    }

    // Register a domain
    function register(string calldata name) public {
        // Check available
        require(domains[name] == address(0));
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    // Retrieve a domain owners address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    // Set record data
    function setRecord(string calldata name, string calldata record) public {
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    // Retrieve record data
    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }
}
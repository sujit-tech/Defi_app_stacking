// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    RWD public rwd;
    Tether public tether;

    address[] public stackers;

    mapping(address => uint256) public stakerBalance;
    mapping(address => bool) public hasStacked;
    mapping(address => bool) public isStacked;

    constructor(RWD _rwd, Tether _tether) {
        owner = msg.sender;
        rwd = _rwd;
        tether = _tether;
    }

    function depositToken(uint256 _amount) public {
        require(_amount > 0, "amount should be greater than 0");
        tether.transferFrom(msg.sender, address(this), _amount);

        stakerBalance[msg.sender] += _amount;

        if (!hasStacked[msg.sender]) {
            stackers.push(msg.sender);
        }

        isStacked[msg.sender] = true;
        hasStacked[msg.sender] = true;
    }
    function unStake() public {
        uint bal = stakerBalance[msg.sender];
        require(bal > 0);
        tether.transfer(msg.sender, bal);
        stakerBalance[msg.sender] = 0;
        isStacked[msg.sender] = false;
    }

    function isIssued() public {
        require(msg.sender == owner);
        for (uint i = 0; i < stackers.length; i++) {
            address recepient = stackers[i];
            uint256 balance = stakerBalance[recepient] / 9;
            if (balance > 0) {
                rwd.transfer(recepient, balance);
            }
        }
    }
}

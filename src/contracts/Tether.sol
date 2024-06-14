// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Tether {
    string public name = "Mock Tether";
    string public symbol = "mUSDT";
    uint256 totalSupply = 1000000000000000000000000; // 1 million eth
    uint8 digits = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    function transfer(
        address to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[to] += _value;
        emit Transfer(msg.sender, to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[from] >= _value);
        require(allowance[from][msg.sender] >= _value);
        balanceOf[to] += _value;
        balanceOf[from] -= _value;
        allowance[from][msg.sender] -= _value;
        emit Transfer(from, to, _value);
        return true;
    }
}

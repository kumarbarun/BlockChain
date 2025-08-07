pragma solidity ^0.5.0;

contract Tather{
    string public name='Tether';
    string public symbol='USDT';
    uint256 public totalSupply=1000000000000000000000000; //1 million tokens
    uint8 public decimal=18;

    event Transfer(
        uint indexed _date,
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address=>uint256) public balanceOf;

    constructor() public {
        balanceOf[msg.sender]=totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool sucess){
        require(balanceOf[msg.sender]>=_value);
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        emit Transfer(block.timestamp, msg.sender, _to, _value);
        return true;
    }
 
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool sucess) {
        require(balanceOf[msg.sender]>=_value);
        balanceOf[_from]-=_value;
        balanceOf[_to]+=_value;
        emit Transfer(block.timestamp, _from, _to, _value);
        return true;
    }
}


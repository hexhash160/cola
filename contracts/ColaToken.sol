pragma solidity ^0.5.9;

import "./lib/Address.sol";
import "./lib/ERC20.sol";
import "./lib/SafeERC20.sol";
import "./lib/Address.sol";
import "./lib/SafeMath.sol";
import "./lib/Math.sol";

contract Cola is ERC20 {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint;

    string private _name;
    string private _symbol;
    uint8 private _decimals;


    address public governance;
    mapping(address => bool) public minters;

    constructor () public ERC20("cola.io","cola"){
        _decimals = 18;
        governance = msg.sender;
    }



    function mint(address account, uint amount) public {
        require(minters[msg.sender], "!minter");
        _mint(account, amount);
    }

    function setGovernance(address _governance) public {
        require(msg.sender == governance, "!governance");
        governance = _governance;
    }

    function addMinter(address _minter) public {
        require(msg.sender == governance, "!governance");
        minters[_minter] = true;
    }

    function removeMinter(address _minter) public {
        require(msg.sender == governance, "!governance");
        minters[_minter] = false;
    }
}
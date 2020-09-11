// SPDX-License-Identifier: GPL
pragma solidity ^0.5.9;

import "../lib/ERC20.sol";
import "../lib/SafeERC20.sol";
import "../lib/Address.sol";
import "../lib/SafeMath.sol";
import "../lib/Math.sol";
/**
 * @title TanganyTestToken
 * @dev Very simple ERC20 Token example, where all 10000 tokens are pre-assigned to the creator.
 */
contract TestToken is ERC20 {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint;

    string private _name;
    string private _symbol;
    uint8 private _decimals;


    address public governance;
    mapping(address => bool) public minters;
    uint8 public constant DECIMALS = 18;
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () public {
        _name = "ERC20ExampleToken";
        _symbol = "EET";
        _decimals = 18;
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function name() public view returns (string memory) {
        return _name;
    }
    function symbol() public view returns (string memory) {
        return _symbol;
    }
    function decimals() public view returns (uint8) {
        return _decimals;
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

    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint(DECIMALS)); // 10000 tokens




}
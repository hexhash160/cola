// SPDX-License-Identifier: GPL
pragma solidity ^0.5.9;

import "../lib/ERC20.sol";
import "../lib/ERC20Detailed.sol";
import "../lib/SafeERC20.sol";

/**
 * @title TanganyTestToken
 * @dev Very simple ERC20 Token example, where all 10000 tokens are pre-assigned to the creator.
 */
contract TestToken is ERC20, ERC20Detailed {
    // modify token name
    string public constant NAME = "ERC20ExampleToken";
    // modify token symbol
    string public constant SYMBOL = "EET";
    // modify token decimals
    uint8 public constant DECIMALS = 18;
    // modify initial token supply
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS)); // 10000 tokens

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () public ERC20Detailed(NAME, SYMBOL, DECIMALS) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address account, uint amount) public {
        _mint(account, amount);
    }

}
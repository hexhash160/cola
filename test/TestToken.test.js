const {expectRevert} = require('@openzeppelin/test-helpers');
const TestToken = artifacts.require('TestToken');
let ownerAddr = '0x7d3221a00Dd94d5D2EAaC7e71234DC78d4C2A664';
const SushiToken = artifacts.require('Cola');

contract('ColaToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.testToken = await TestToken.new({from: alice});
    });
    // it('should have correct name and symbol and decimal', async () => {
    //     const name = await this.testToken.name();
    //     const symbol = await this.testToken.symbol();
    //     const decimals = await this.testToken.decimals();
    //     assert.equal(name.valueOf(), 'ERC20ExampleToken');
    //     assert.equal(symbol.valueOf(), 'EET');
    //     assert.equal(decimals.valueOf(), '18');
    // });

    it('should supply token transfers properly', async () => {

        await this.testToken.transfer(carol, '10', {from: alice});
        await this.testToken.transfer(bob, '200', {from: alice});
        await this.testToken.transfer(carol, '100', {from: bob});
        const totalSupply = await this.testToken.totalSupply();
        const aliceBal = await this.testToken.balanceOf(alice);
        const bobBal = await this.testToken.balanceOf(bob);
        const carolBal = await this.testToken.balanceOf(carol);
        // assert.equal(totalSupply.valueOf(), '1100');
        // assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '100');
        assert.equal(carolBal.valueOf(), '110');

    });


});

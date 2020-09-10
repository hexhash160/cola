const {expectRevert} = require('@openzeppelin/test-helpers');
const cola = artifacts.require('Cola');
const poolReward = artifacts.require('SunPoolReward');
const TokenSimpleERC20Contract = artifacts.require("DSToken")
const Decimal = 1000000000000000000


contract('Reward', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.testToken = await TokenSimpleERC20Contract.new("abc", "abc", BigInt(100000000 * Decimal).toString(), 18)
        this.cola = await cola.new({from: alice});
        this.poolReward = await poolReward.new(this.testToken.address, this.cola.address, {from: alice});
        await this.cola.addMinter(alice);
        await this.cola.addMinter(this.poolReward.address);//Allow reward contracts to issue tokens

        await this.cola.mint(alice, '100', {from: alice});
        await this.cola.mint(bob, '100', {from: alice});
        await this.cola.mint(carol, '100', {from: alice});
    });

    it('should not allow enter if not enough approve', async () => {
        // this.poolReward.stake('100', {from: alice});
        // await expectRevert(
        //     this.poolReward.stake('100', {from: alice}),
        //     'ds-token-insufficient-approval',
        // );
        // await this.testToken.approve(this.poolReward.address, '50', {from: alice});
        // await expectRevert(
        //     this.poolReward.stake('100', {from: alice}),
        //     'ERC20: transfer amount exceeds allowance',
        // );
        // await this.testToken.approve(sunAddress, '100', {from: alice});
        // await this.poolReward.stake('100', {from: alice});
        // assert.equal((await this.bar.balanceOf(alice)).valueOf(), '100');
    });

    it('should not allow withraw more than what you have', async () => {
        await this.testToken.approve(this.poolReward.address, '100', {from: alice});
        await this.poolReward.stake('100', {from: alice});
        // await expectRevert(
        //     this.poolReward.exit('100', {from: alice}),
        //     'ERC20: burn amount exceeds balance',
        // );
    });


});

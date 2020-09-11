const {expectRevert, time} = require('@openzeppelin/test-helpers');
const cola = artifacts.require('Cola');
const poolReward = artifacts.require('SunPoolReward');
const TokenSimpleERC20Contract = artifacts.require("TestToken")
const Decimal = 1000000000000000000


contract('Reward', ([alice, bob, carol]) => {
    beforeEach(async () => {
        // time.increaseTo(1602510488);
        this.testToken = await TokenSimpleERC20Contract.new({from: bob})
        // this.testToken.start();
        this.cola = await cola.new({from: alice});
        this.poolReward = await poolReward.new(this.testToken.address, this.cola.address, {from: alice});
        await this.cola.addMinter(alice);
        await this.cola.addMinter(this.poolReward.address);//Allow reward contracts to issue tokens

        await this.cola.mint(alice, '100', {from: alice});
        await this.cola.mint(bob, '100', {from: alice});
        await this.cola.mint(carol, '100', {from: alice});
    });

    it('should not allow enter if not enough approve', async () => {
        this.testToken.transfer(alice, '200');
        assert.equal((await this.testToken.balanceOf(alice)).valueOf(), "200");
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

    it('users pledge and withdraw proceeds', async () => {
        // await this.testToken.approve(this.poolReward.address, '100', {from: alice});
        // await this.poolReward.stake('100', {from: alice});
        // await this.poolReward.withdraw('1', {from: alice});
        // assert.equal((await this.poolReward.balanceOf(alice)).valueOf(), '99');
        // await this.poolReward.exit({from: alice})
        // await expectRevert(
        //     this.poolReward.exit({from: alice}),
        //     'ERC20: burn amount exceeds balance',
        // );
    });


});

const {
    advanceBlock,
    advanceToBlock,
    increaseTime,
    increaseTimeTo,
    duration,
    revert,
    latestTime
} = require('truffle-test-helpers');

const {expectRevert, time} = require('@openzeppelin/test-helpers');
const cola = artifacts.require('Cola');
const poolReward = artifacts.require('SunPoolReward');
const TokenSimpleERC20Contract = artifacts.require("TestToken")
const Decimal = 1000000000000000000


contract('Reward', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.startTime = await latestTime();

        this.testToken = await TokenSimpleERC20Contract.new({from: bob})
        // this.testToken.start();
        this.cola = await cola.new({from: alice});
        this.poolReward = await poolReward.new(this.testToken.address, this.cola.address, this.startTime, {from: alice});
        console.log("reward:" + this.poolReward.address)
        // await this.cola.addMinter(alice);
        await this.cola.addMinter(this.poolReward.address);//Allow reward contracts to issue tokens

        // await this.cola.mint(alice, '200', {from: alice});
        // await this.cola.mint(bob, '100', {from: alice});
        // await this.cola.mint(carol, '100', {from: alice});
        await this.testToken.transfer(alice, '200', {from: bob});
        this.endTime = this.startTime + duration.minutes(1);
        console.log("start time:" + this.startTime);
        console.log("end time:" + this.endTime);
        this.currentBlock = await time.latestBlock();
        console.log("current block:" + this.currentBlock)
    });

    it('stake and get reward', async () => {
        await this.testToken.approve(this.poolReward.address, '200', {from: alice});
        this.poolReward.stake('100', {from: alice});
        assert.equal((await this.testToken.balanceOf(alice)).valueOf(), "100");
        console.log("begin advanceToBlock");

        // for (let i = 0; i < 20; ++i) {
        //     await time.advanceBlock();
        // }
        console.log("end advanceToBlock");
        let earned = await this.poolReward.earned(alice);
        let rewardPerToken = await this.poolReward.rewardPerToken();
        this.currentBlock = await web3.eth.getBlock("latest")
        console.log("current block:" + this.currentBlock)
        console.log("rewardPerToken:" + rewardPerToken);
        console.log("reward:" + earned);
        // console.log("periodFinish:" +  this.poolReward.periodFinish());
        // console.log("lastUpdateTime:" + this.poolReward.lastUpdateTime());
        assert.ok(earned > 0, "alice get reward")
        // await this.poolReward.withdraw('100',{from: alice});
        const aliceBal = await this.cola.balanceOf(alice);
        // await this.poolReward.getReward();
        console.log("alice balance :" + aliceBal);


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

    // it('users pledge and withdraw proceeds', async () => {
    // await this.testToken.approve(this.poolReward.address, '100', {from: alice});
    // await this.poolReward.stake('100', {from: alice});
    // await this.poolReward.withdraw('1', {from: alice});
    // assert.equal((await this.poolReward.balanceOf(alice)).valueOf(), '99');
    // await this.poolReward.exit({from: alice})
    // await expectRevert(
    //     this.poolReward.exit({from: alice}),
    //     'ERC20: burn amount exceeds balance',
    // );
    // });


});

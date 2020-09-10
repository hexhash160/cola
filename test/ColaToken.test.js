const {expectRevert} = require('@openzeppelin/test-helpers');
const SushiToken = artifacts.require('Cola');
let ownerAddr = '0x7d3221a00Dd94d5D2EAaC7e71234DC78d4C2A664';

contract('ColaToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.cola = await SushiToken.new({from: alice});
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.cola.name();
        const symbol = await this.cola.symbol();
        const decimals = await this.cola.decimals();
        assert.equal(name.valueOf(), 'ColaToken');
        assert.equal(symbol.valueOf(), 'COLA');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.cola.addMinter(alice);
        await this.cola.addMinter(bob);
        await this.cola.mint(alice, '100', {from: alice});
        await this.cola.mint(bob, '1000', {from: alice});
        await expectRevert(
            this.cola.mint(carol, '1000', {from: carol}),
            '!minter',
        );
        const totalSupply = await this.cola.totalSupply();
        const aliceBal = await this.cola.balanceOf(alice);
        const bobBal = await this.cola.balanceOf(bob);
        const carolBal = await this.cola.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.cola.addMinter(alice);
        await this.cola.addMinter(bob);
        await this.cola.mint(alice, '100', {from: alice});
        await this.cola.mint(bob, '1000', {from: alice});
        await this.cola.transfer(carol, '10', {from: alice});
        await this.cola.transfer(carol, '100', {from: bob});
        const totalSupply = await this.cola.totalSupply();
        const aliceBal = await this.cola.balanceOf(alice);
        const bobBal = await this.cola.balanceOf(bob);
        const carolBal = await this.cola.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.cola.addMinter(alice);
        await this.cola.mint(alice, '100', {from: alice});
        await expectRevert(
            this.cola.transfer(carol, '110', {from: alice}),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.cola.transfer(carol, '1', {from: bob}),
            'ERC20: transfer amount exceeds balance',
        );
    });
});

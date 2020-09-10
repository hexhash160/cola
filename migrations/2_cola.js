const Cola = artifacts.require("ColaToken")


let ownerAddr = '0xee71C9C50eF8D692c8EE553A1ba130e43eDF3a17';

module.exports = async function (deployer, network, accounts) {
    console.log('owner:', accounts[0]);
    ownerAddr = accounts[0];
    if (network === "ropsten" || network === "mainnet") {
        //return;
    } else { // test
         colaAmount = 100000000;
         colaDec = 2;
    }
    await deployer.deploy(Cola, "Cola", "Cola", BigInt(colaAmount).toString(), colaDec);
    console.log('Ones:', Cola.address);

};

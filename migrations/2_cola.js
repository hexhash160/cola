const Cola = artifacts.require("Cola")
const Reward = artifacts.require("CountPoolReward")


let ownerAddr = '0x7d3221a00Dd94d5D2EAaC7e71234DC78d4C2A664';

module.exports = async function (deployer, network, accounts) {
    console.log('owner:', accounts[0]);
    ownerAddr = accounts[0];
    // if (network === "ropsten" || network === "mainnet") {
    //     //return;
    // } else { // test
    //      colaAmount = 100000000;
    //      colaDec = 2;
    // }
    // await deployer.deploy(Cola, "Cola", "Cola", BigInt(colaAmount).toString(), colaDec);
    // console.log('Ones:', Cola.address);

};

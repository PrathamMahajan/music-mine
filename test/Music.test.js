const assert = require('assert');
const ganache = require('ganache-cli');
const { describe } = require('node:test');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let music;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  music = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Music Contract', () => {
    it('deploys a contract', ()=>{
        assert.ok(music.options.address)
    })

    it("should allow fans to become a fan and pay the required fee", async () => {
        const initialBalance = await web3.eth.getBalance(musicInstance.address);
    
        await musicInstance.becomeFan({ from: fan1, value: web3.utils.toWei(".02", "ether") });
        await musicInstance.becomeFan({ from: fan2, value: web3.utils.toWei(".01", "ether") });
    
        const fan1IsFan = await musicInstance.Fans(fan1);
        const fan2IsFan = await musicInstance.Fans(fan2);
        const finalBalance = await web3.eth.getBalance(musicInstance.address);
    
        assert.equal(fan1IsFan, true, "Fan1 was not added as a fan");
        assert.equal(fan2IsFan, true, "Fan2 was not added as a fan");
        assert.equal(finalBalance - initialBalance, web3.utils.toWei(".03", "ether"), "Contract balance was not updated correctly");
      });
});
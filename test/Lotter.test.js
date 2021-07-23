const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());
let accounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Lottery contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });
  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });
    const initialbalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickUpWinner().send({
      from: accounts[0]
    });
    const finalbalance = await web3.eth.getBalance(accounts[0]);
    const diff = finalbalance - initialbalance;
    assert(diff > web3.utils.toWei('1.8', 'ether'));
  });
});

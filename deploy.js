const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'skirt that travel output build update bless grape fit bright oval virus',
  'https://rinkeby.infura.io/v3/f68cb2aa77f14e2cab87eb2773bd5767'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('attempting to deploy from', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from:accounts[0], gas: '1000000' });
  console.log(interface);
  console.log("contract deployed to ", result.options.address);
};
deploy();

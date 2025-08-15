/* global artifacts, contract, web3, deployer */
const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function(deployer, network, accounts) {

  // Deploy Mock Tether Contract
  await deployer.deploy(Tether)
  const tether = await Tether.deployed()

  // Deploy RWD Contract
  await deployer.deploy(RWD)
  const rwd = await RWD.deployed()

  // Deploy DecentralBank Contract
  await deployer.deploy(DecentralBank, rwd.address, tether.address)
  const decentralBank = await DecentralBank.deployed()

  // Transfer all tokens to DecentralBank (1 Token)
  await rwd.transfer(decentralBank.address, '1000000000000000000000000')

  // Transfer 100 Mock Tether tokens to investor
  await tether.transfer(accounts[1], '100000000000000000000')

  // Transfer 100 Mock Tether tokens to investor
  await tether.transfer(accounts[2], '100000000000000000000')

  // Transfer 100 Mock Tether tokens to investor
  await tether.transfer(accounts[3], '100000000000000000000')

  // Transfer 100 Mock Tether tokens to investor
  await tether.transfer(accounts[4], '100000000000000000000')
}
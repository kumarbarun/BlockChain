/* global artifacts, contract, web3, deployer */
const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    //All the code goes here for testing

    let tether, rwd, decentralBank;

    function tokens(number){
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // Load contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        // Transfer all RWD tokens to DecentralBank (1 million)
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 mock tether tokens to customer
        await tether.transfer(customer, tokens('100'), {from: owner})
    })

    describe('Mock Tether Deployment', async () => {
        it('matches name sucessfully', async () => {
            const name= await tether.name()
            assert.equal(name, "Mock Tether Token")
        })
    })


    describe('Reward Token Deployment', async () => {
        it('matches name sucessfully', async () => {
            const name= await rwd.name()
            assert.equal(name, "Reward Token")
        })
    })
})
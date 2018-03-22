# Introduction
Document certification, also known as time-stamping or proof of existence, is one of the most obvious use cases for blockchain technology beyond digital currencies. Document certification consists in saving a tamper-proof timestamped fingerprint of a document (or binary file) on the blockchain. This basically serves as proof that the document existed in a certain version at a certain time and can be used to prove integrity of the file. That is, you can prove that a document has not been modified since its certification. Use cases cover registering private contracts, protecting copyright, sealing log files and any other case where file integrity is important.

In this tutorial we will look at how to create an Ethereum contract that allows to store data on the blockchain and read it, by using document certification as an example. To do so, we will create a simple smart contract that saves an SHA-256 hash of a file on the blockchain, together with a timestamp. SHA-256 hashes uniquely identify sets of data by means of a cryptographic hash function. We will not go into detail on hash functions and cryptography here, but you should know that a SHA-256 hash is a 32-byte fingerprint derived from the input data. The reverse operation, i.e. calculating the data from the hash value, is not feasible, so data protection is a welcome side-effect.

# Contributing
This tutorial is forked from the medium of Stefan Beyer: [Ethereum Development Guide](https://medium.com/@sbeyer_31150/ethereum-development-guide-part-1-ad0c77c3683f)

However, in this tutorial, i will deploy an Ethereum Document Certification Contract on your Private Ethereum Blockchain.

# Deploy
### Developing the smart contract
We will use the [Solidity](https://solidity.readthedocs.io/en/develop/) programming language to write our contract and the [Truffle](http://truffleframework.com/) framework to ease development.

Install Truffle with the following command (the -g option may require root privileges on your system):

    npm install -g truffle

In the ether-doc-cert directory, compile this code with truffle type:

    truffle compile

Before we can execute this code and proceed with the actual deployment, we have to configure Truffle to use our local test blockchain for deployment.

To do so we need to edit the file truffle.js which is the main configuration file, and add the following content:

    module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: "*"
        },
        live: {
            host: "<ip_host>",
            port: 8545,
            network_id: "*",
            gas: 4000000,
            from: "<your_address>"
        }
    }
    };

**development**: This code tells truffle to look for an Ethereum node’s RPC interface on port 7545 on localhost and deploy onto the network we find there, whatever the network id. You can use [Ganache](http://truffleframework.com/ganache/).

**live**: This code tells truffle to look for an your Private Ethereum node’s RPC interface on port 8545 (RPC port) on host `<ip_host>`. `<your_address>` is a placeholder which you should replace with the address you want to use to deploy your Smart Contracts

Then in geth console, unlock the account:

    personal.unlockAccount("<your_address>")

Now we can deploy the contract by typing:

    truffle migrate --network live

It is not actually necessary to explicitly specify the network, as truffle will deploy to the first network on the list. However, it is good practice to do so, in order to avoid mistakes later on. During development we might fix some bugs and redeploy. To do a re-deploy we have to add a reset option:

    truffle migrate --network live --reset

Output example:

>Using network 'development'.
Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0x5ea5433cf9f036c16a0b9509814ecd2dc411aab33fc3cd79e800cb5489177215
  Migrations: 0x7833f38dff7b33e8a18614f27551795f1f08209a
Saving successful migration to network...
  ... 0x4f7849eba776524dbc07c7e1b3ab23bb148f074fd684073b703226696d76723b
Saving artifacts...
Running migration: 1521517248_notary.js
  Replacing Notary...
  ... 0x1736b51e369a7e9b22dcb1fa9d79ea7e6ea3a68dc380e72f8339df62c8a93acc
  Notary: 0xf3762f6e21bf1d040d85e7daee89dfa74c92c6b4
Saving successful migration to network...
  ... 0x61a29767692a5c693f72c2d624e0fb6df14b2798c70dae18b92e6da514828c6d
Saving artifacts...

Next, edit file `ether-doc-cert/webapp/notaryWebLib.js`. `var address` is contract address in above results: `Notary: 0xf3762f6e21bf1d040d85e7daee89dfa74c92c6b4`

### Developing web interfaces for smart contracts
If you do not have a local web server application you may use http-server. This can be installed globally with:

    npm install http-server -g
    cd ether-doc-cert/webapp/
    http-server .
    
Now we can serve our web application on http://localhost:8080

# Test
We will use the [MetaMask](https://metamask.io/) browser plugin, which is available for Chrome and Firefox. MetaMask is an Ethereum wallet for the browser. The extension actually injects a web3 provider into the browser, which allows us to connect to the blockchain via a MetaMask provided node. We can use web3 as usual and MetaMask will automatically pop up and ask users to confirm transactions and, importantly, spend their own Ether.

After install MetaMask, connect to your private blockchain network (Custome RPC).

<img src="https://github.com/datts68/ether-doc-cert/blob/master/images/ether-doc-cert-01.png">
<img src="https://github.com/datts68/ether-doc-cert/blob/master/images/ether-doc-cert-02.png">
<img src="https://github.com/datts68/ether-doc-cert/blob/master/images/ether-doc-cert-03.png">
<img src="https://github.com/datts68/ether-doc-cert/blob/master/images/ether-doc-cert-04.png">
<img src="https://github.com/datts68/ether-doc-cert/blob/master/images/ether-doc-cert-05.png">


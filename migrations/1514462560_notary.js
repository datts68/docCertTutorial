var NotaryContract = artifacts.require("Notary");

module.exports = function(deployer) {
    deployer.deploy(NotaryContract);
};

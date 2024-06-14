const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueToken(callback) {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.isIssued();
  console.log("successfully issued tokens");
  callback();
};

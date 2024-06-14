const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  beforeEach(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    await rwd.transfer(decentralBank.address, tokens("1000000"));

    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("Mock Tether Deployement", async () => {
    it("Maches the name", async () => {
      let name = await tether.name();
      assert.equal(name, "Mock Tether");
    });
    it("Maches the Symbol", async () => {
      let symbol = await tether.symbol();
      assert.equal(symbol, "mUSDT");
    });
  });
  describe("Reward Deployement", async () => {
    it("Maches the name", async () => {
      let name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
    it("Maches the Symbol", async () => {
      let symbol = await rwd.symbol();
      assert.equal(symbol, "RWD");
    });
  });
  describe("Decentral Bank Deployement", async () => {
    it("Maches the name", async () => {
      let name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });
    it("conctract as tokens", async () => {
      let bal = await rwd.balanceOf(decentralBank.address);
      assert.equal(bal, tokens("1000000"));
    });
  });
  describe("Yield Farming", async () => {
    it("reward for stacking", async () => {
      let result = await tether.balanceOf(customer);
      assert.equal(result.toString(), tokens("100"));
      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer,
      });
      await decentralBank.depositToken(tokens("100"), { from: customer });

      result = await tether.balanceOf(customer);
      assert.equal(result.toString(), tokens("0"));

      result = await tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), tokens("100"));

      let stacking = await decentralBank.isStacked(customer);
      assert.equal(stacking, true);

      await decentralBank.isIssued({ from: owner });

      await decentralBank.isIssued({ from: customer }).should.be.rejected;

      await decentralBank.unStake({ from: customer });

      result = await tether.balanceOf(customer);
      assert.equal(result.toString(), tokens("100"));

      result = await tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), tokens("0"));

      let unstacking = await decentralBank.isStacked(customer);
      assert.equal(unstacking, false);
    });
  });
});

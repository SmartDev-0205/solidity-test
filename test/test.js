const { expect } = require("chai");

describe("First version", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TokenAvgPrice");
    let tokenAddress = '0x4fabb145d64652a948d72533023f6e7a623c7c53';
    const hardhatToken = await Token.deploy(tokenAddress);

    // connect from any account
    await hardhatToken.connect(addr1);

    for (let i = 0; i < 10; i++) {
      await hardhatToken.setPrice(1000 + i * 100);
    }
    let tokenPrice = await hardhatToken.getPrice();
    console.log(tokenPrice);

    let tokenAvgPrice = await hardhatToken.getMonthAvgPrice(2);
    console.log(tokenAvgPrice);

  });
});


describe("Second version", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SecondTokenAvgPrice");
    let tokenAddress = '0x4fabb145d64652a948d72533023f6e7a623c7c53';
    const hardhatToken = await Token.deploy(tokenAddress);

    // connect from any account
    try {
      hardhatToken = await hardhatToken.connect(addr1);

      for (let i = 0; i < 10; i++) {
        await hardhatToken.setPrice(1000 + i * 100);
      }

    } catch (error) {

      console.log("we cannot connect from other adddress , so try from owner account", error);
    }
    hardhatToken = await hardhatToken.connect(owner);

    for (let i = 0; i < 10; i++) {
      await hardhatToken.setPrice(1000 + i * 100);
    }

    let tokenPrice = await hardhatToken.getPrice();
    console.log(tokenPrice);

    let tokenAvgPrice = await hardhatToken.getMonthAvgPrice(2);
    console.log(tokenAvgPrice);

  });
});  
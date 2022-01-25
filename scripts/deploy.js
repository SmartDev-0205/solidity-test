// npx hardhat run scripts/deploy.js --network <network-name>

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const TokenAvgPrice = await ethers.getContractFactory("TokenAvgPrice");
    const tokenAvgPrice = await TokenAvgPrice.deploy();
    console.log("Token address:", tokenAvgPrice.address);

    const SecondTokenAvgPrice = await ethers.getContractFactory("SecondTokenAvgPrice");
    const secondTokenAvgPrice = await SecondTokenAvgPrice.deploy();
    console.log("Token address:", secondTokenAvgPrice.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
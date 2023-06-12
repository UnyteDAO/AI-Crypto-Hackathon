// deploy.js
const main = async () => {
  // hardhat側の記法が変更になった
  // const deployedContract = await ethers.deployContract("Hackathon");
  // await deployedContract.waitForDeployment();
  // console.log("Contract Address:", await deployedContract.getAddress());
  const nftContractFactory = await hre.ethers.getContractFactory("Hackathon");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  let txn = await nftContract.mint("0x3a0bE810754f7f7D04fCA10E2C11E93ebb5BF19e","ipfs://QmQ2DyLqnpyQm51bPQufQfQtXTpeVmwKowW1524EpzWqnB","1");
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log("Minted NFT");
  console.log("成功");
};
// エラー処理を行っています。
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runMain();
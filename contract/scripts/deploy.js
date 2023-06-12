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
  console.log("ミント成功");

  // バッチでNFTをミントする
  txn = await nftContract.mintBatch(
    ["0xdC56956cD5441348c758519AFb66a10D86cbe7b2", "0x4C09EaeDb76fE46E44C69f5cE997faa7502e46F9"],
    ["ipfs://QmUNfwH1Sh4K8nNSY3hJ2qTpbtqaUeJPVqr3K86yC5Decq", "ipfs://Qmb4B1WEdd3VQfEMSR9hSdM4xyJcGv4j9RhmeDUTpGAbEL"],
    ["1", "2"]
  );
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log("バッチミント成功");
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
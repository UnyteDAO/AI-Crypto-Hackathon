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
  let txn = await nftContract.mint("0x3a0bE810754f7f7D04fCA10E2C11E93ebb5BF19e","ipfs://QmepboQBo9oTfkfqHM8nKuXZ3W1UBThWBRBLFwveuZP7Z7","1","doing","Unyte");
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log("Minted NFT");
  console.log("ミント成功");

  // バッチでNFTをミントする
  txn = await nftContract.mintBatch(
    ["0xdC56956cD5441348c758519AFb66a10D86cbe7b2", "0x4C09EaeDb76fE46E44C69f5cE997faa7502e46F9"],
    ["ipfs://QmepboQBo9oTfkfqHM8nKuXZ3W1UBThWBRBLFwveuZP7Z7", "ipfs://QmPy6xxBygx1GGGWwn1D8jik8kAEHMBCoNe3KLN59zKyRY"],
    ["1", "2"],
    ["doing", "done"],
    ["Unyte", "Unyte"]
  );
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  console.log(txn)
  console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")
  let receipt = await txn.wait();
  console.log(receipt);
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
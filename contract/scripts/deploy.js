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
  let txn = await nftContract.mint("0x4C09EaeDb76fE46E44C69f5cE997faa7502e46F9","ipfs://Qma6NnmYjeVQy1c8jERyBboF1SvXpiiXmQuE8iNJsFeXYA","1","1");
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log("Minted NFT");
  console.log("ミント成功");

  // バッチでNFTをミントする
  txn = await nftContract.mintBatch(
    ["0x4C09EaeDb76fE46E44C69f5cE997faa7502e46F9", "0x4C09EaeDb76fE46E44C69f5cE997faa7502e46F9"],
    ["ipfs://Qma6NnmYjeVQy1c8jERyBboF1SvXpiiXmQuE8iNJsFeXYA", "ipfs://Qma6NnmYjeVQy1c8jERyBboF1SvXpiiXmQuE8iNJsFeXYA"],
    ["1", "2"],
    ["1", "2"]
  );
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  console.log(txn)
  console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")
  let receipt = await txn.wait();
  // console.log(receipt);
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
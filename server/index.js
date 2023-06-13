exports.handler = async function (event, context) {
// const handler = async(event) => {
    const { ethers } = require("ethers");
    console.log(event)
    const data = JSON.parse(event.body)
    const tasks = data.tasks
    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        // タスクのteam,recipient,requester,taskを取得
        const team = task.team
        const recipient = task.recipient
        const requester = task.requester
        const taskContent = task.task
        console.log(team,recipient,requester,taskContent)

        // 秘密鍵からアカウントの作成
        const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL");
        const privateKey = process.env.PRIVATE_KEY;
        const walletWithProvider = new ethers.Wallet(privateKey, provider);

        // コントラクトのアドレスとABIを読み込む
        const contractAddress = process.env.CONTRACT_ADDRESS;
        const contractABI = require("./Hackathon.json");

        // コントラクトのインスタンスを作成
        const connectedContract = new ethers.Contract(contractAddress, contractABI.abi, walletWithProvider);

        // タスク毎にNFTをmintする
        const result = await connectedContract.mintBatch(
            recipient.walletAddress,
            ["ipfs://QmUNfwH1Sh4K8nNSY3hJ2qTpbtqaUeJPVqr3K86yC5Decq", "ipfs://Qmb4B1WEdd3VQfEMSR9hSdM4xyJcGv4j9RhmeDUTpGAbEL"],
            [taskContent.id, taskContent.id]
        );
        console.log(result)
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
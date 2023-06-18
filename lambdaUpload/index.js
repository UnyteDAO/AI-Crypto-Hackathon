// require('dotenv').config();
exports.handler = async function (event, context) {
// const handler = async () => {
    const { ethers } = require("ethers");
	const pinataSDK = require('@pinata/sdk');
	const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY});

	const createNFTImage = async (userid, username, type ,icon, borderImage, textColor) => {
		const fs = require("fs");
		const fetch = require("node-fetch");
		const { Resvg } = require("@resvg/resvg-js");

		const base = fs.readFileSync("./image/base.svg", "utf8");
		let fontsize = "64";
		username = username.substring(0, 24);
		for (let i = 0; i < username.length; i++) {
			if (username.charCodeAt(i) >= 256) {
				username = username.substring(0, 24);
				fontsize = "560";
				break;
			}
		};

		let baseImage = "";
		if (type == "doing") {
			baseImage = "https://media.discordapp.net/attachments/1116624090241974364/1118535456758452224/20230614_NFT_A1.jpg";
		} else if (type == "done") {
			baseImage = "https://media.discordapp.net/attachments/1116624090241974364/1118535457131724880/20230614_NFT_A2.jpg";
		}

		let svg = base.replaceAll("$username$", username);
		svg = svg.replaceAll("$base-image$", baseImage);
		svg = svg.replaceAll("$border-image$", borderImage);
		svg = svg.replaceAll("$icon$", icon);
		svg = svg.replaceAll("$text-color$", textColor);
		svg = svg.replaceAll("$font-size$", fontsize);

		//fs.writeFileSync(`./sbt-image/svg/${userid}.svg`, svg);

		const opts = {
			font: {
				fontFiles: ['./example/SourceHanSerifCN-Light-subset.ttf'], // Load custom fonts.
				loadSystemFonts: false, // It will be faster to disable loading system fonts.
				defaultFontFamily: 'Source Han Serif CN Light',
			},
		};
		const resvg = new Resvg(svg, opts);

		const resolved = await Promise.all(
			resvg.imagesToResolve().map(async (url) => {
				const img = await fetch(url);
				const buffer = await img.arrayBuffer();
				return {
					url,
					buffer: Buffer.from(buffer),
				};
			}),
		);

		if (resolved.length > 0) {
			for (const result of resolved) {
				const { url, buffer } = result;
				resvg.resolveImage(url, buffer);
			}
		}

		const pngData = resvg.render();
		const pngBuffer = pngData.asPng();
		// 書き込み形式を変更
		fs.writeFileSync(`/tmp/${userid}.png`, pngBuffer);
		console.log(`created ${userid}.png`);
		console.log(svg)
		return(`/tmp/${userid}.png`);
	};

	const createNFTJSON = async (_team,_type,_name,_ipfsLink) => {
		// 以下のJSONをjsベースのコードで生成する
		const JSON = {
			attributes: [
				{
				trait_type: "Team",
				value: _team
				},
				{
				trait_type: "Type",
				value: _type
				}
			],
			name: _name,
			symbol: "UNYTE",
			description: "NFTs attesting to their contribution in the DAOs recorded by Unyte. With Unyte, members can easily record proposals, contributions and praise comments using slash commands. We can also send ERC20 tokens, NFT or WL depending on what is being recorded. More info: https://unyte.team/",
			image: _ipfsLink,
			external_url: "https://beta.unyte.team/"
		}
	}

    console.log(event)
    const data = JSON.parse(event.body)
	// const data = event.body
	console.log(data)
    const tasks = data.tasks

	const status = data.status
	const team = data.team
	const requester = data.requester
	console.log("status, ", status, "team, ", team, "requester, ", requester)

	// コントラクトを叩くための引数にあたる配列を作成
	let owners = []
	let _ipfsLinks = []
	let _taskIds = []
	let _documentIds = []

	// const path = await createNFTImage(requester.id, "Unyte task", status, "https://pbs.twimg.com/media/FyjEYVzacAEJwqD?format=jpg", "https://pbs.twimg.com/media/FyjEYVzacAEJwqD?format=jpg", "white");
	const path = './image/png/0.png'
	// データをipfsにアップロード
	let hash = "";
	if(status == "doing"){
		hash = "ipfs://QmR61viQsz52zxf9tB7TT9csuxxK6c5pq7hTgCXAytv8Eo"
	}else if(status == "done"){
		hash = "ipfs://QmSHU6MGq5fbVYFVodTRK1meaTugS6agAAWNn9SQQ78X9h"
	}
	// await pinata.pinFromFS(path).then((result) => {
	// 	//handle results here
	// 	console.log(result);
	// 	hash = result.IpfsHash;
	// }).catch((err) => {
	// 	//handle error here
	// 	console.log(err);
	// 	return;
	// });

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        const walletAddress = task.walletAddress
        const taskContent = task.task
        console.log(walletAddress,taskContent)
		console.log(taskContent.name)

		// documentIdを作成(idの末尾の2文字を削除)
		const documentId = taskContent.id.slice(0, -2);
		// 受取者ごとに配列に追加
		for (let i = 0; i < walletAddress.length; i++) {
			owners.push(walletAddress[i]);
			_ipfsLinks.push(hash);
			_taskIds.push(taskContent.id);
			_documentIds.push(documentId);
		}
    }

	// 秘密鍵からアカウントの作成
	// mumbai
	// const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL");
	// astar
	const provider = new ethers.providers.JsonRpcProvider("https://evm.astar.network");
	const privateKey = process.env.PRIVATE_KEY;
	const walletWithProvider = new ethers.Wallet(privateKey, provider);

	// コントラクトのアドレスとABIを読み込む
	const contractAddress = process.env.CONTRACT_ADDRESS;
	const contractABI = require("./Hackathon.json");

	// コントラクトのインスタンスを作成
	const connectedContract = new ethers.Contract(contractAddress, contractABI.abi, walletWithProvider);

	// タスク毎にNFTをmintする
	let txStatus = "";
	let txHash = "";
	let message = "";
	console.log(_taskIds, _documentIds, _ipfsLinks)
	try {
		const txn = await connectedContract.mintBatch(
			owners,
			_ipfsLinks,
			_taskIds,
			_documentIds
		);
		// console.log(txn);
		// txStatus = "success"
		// txHash = txn.hash
		const result = await txn.wait();
		console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨");
		console.log(result);
		txStatus = "success"
		txHash = result.transactionHash
		console.log(result);
	} catch (error) {
		txStatus = "error"
		message = error.reason
		console.log(error);
	}

	const responseJSON = {
		status: txStatus,
		txHash: txHash,
		message: message
	}
    
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify(responseJSON),
    };
    return response;
};

// handler();
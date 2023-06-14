const createNFTImage = async (userid, username, icon, baseImage, borderImage, textColor) => {
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

	let svg = base.replaceAll("$username$", username);
	svg = svg.replaceAll("$base-image$", baseImage);
	svg = svg.replaceAll("$border-image$", borderImage);
	svg = svg.replaceAll("$icon$", icon);
	svg = svg.replaceAll("$text-color$", textColor);
	svg = svg.replaceAll("$font-size$", fontsize);

	//fs.writeFileSync(`./sbt-image/svg/${userid}.svg`, svg);

	const opts = {
		font: {
			fontFiles: ["./image/MPLUSRounded1c-Medium.ttf", "./image/NotoEmoji-Medium.ttf"],
			loadSystemFonts: true,
			defaultFontFamily: 'Rounded Mplus 1c Medium',
		}
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
    console.log(svg)
	fs.writeFileSync(`./image/png/${userid}.png`, pngBuffer);
	console.log(`created ${userid}.png`);
	// return pngBuffer;
};

// exports.handler = async function (event, context) {
const handler = async(event) => {
    const { ethers } = require("ethers");
    // console.log(event)
    createNFTImage("#0", "Uwaizumi", "https://pbs.twimg.com/profile_images/1640294880340766723/mTitdOjm_400x400.png", "https://media.discordapp.net/attachments/1116624090241974364/1118224028734345266/20230613_NFT_A1.jpg", "https://pbs.twimg.com/profile_images/1583281337674235904/ap9KtnxV_400x400.jpg", "white");
    // const data = JSON.parse(event.body)
    // const tasks = data.tasks
    // for (let index = 0; index < tasks.length; index++) {
    //     const task = tasks[index];
    //     // タスクのteam,recipient,requester,taskを取得
    //     const team = task.team
    //     const recipient = task.recipient
    //     const requester = task.requester
    //     const taskContent = task.task
    //     console.log(team,recipient,requester,taskContent)

    //     // 秘密鍵からアカウントの作成
    //     const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL");
    //     const privateKey = process.env.PRIVATE_KEY;
    //     const walletWithProvider = new ethers.Wallet(privateKey, provider);

    //     // コントラクトのアドレスとABIを読み込む
    //     const contractAddress = process.env.CONTRACT_ADDRESS;
    //     const contractABI = require("./Hackathon.json");

    //     // コントラクトのインスタンスを作成
    //     const connectedContract = new ethers.Contract(contractAddress, contractABI.abi, walletWithProvider);

    //     // タスク毎にNFTをmintする
    //     const result = await connectedContract.mintBatch(
    //         recipient.walletAddress,
    //         "ipfs://QmUNfwH1Sh4K8nNSY3hJ2qTpbtqaUeJPVqr3K86yC5Decq",
    //         taskContent.id,
    //         data.status
    //     );
    //     console.log(result)
    // }
    
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify('success'),
    };
    return response;
};

handler()
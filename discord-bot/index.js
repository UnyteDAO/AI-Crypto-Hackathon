// // discord.js v14では、下記のようにRESTとRoutesはdiscord.jsパッケージから直接インポートできます
// const { REST, Routes } = require("discord.js");

// // hey.jsのmodule.exportsを呼び出します。
// const heyFile = require("./commands/hey.js");

// // 環境変数としてapplicationId, guildId, tokenの3つが必要です
// const { applicationId, guildId, token } = require("./config.json");

// // 登録コマンドを呼び出してリスト形式で登録
// const commands = [heyFile.data.toJSON()];

// // DiscordのAPIには現在最新のversion10を指定
// const rest = new REST({ version: "10" }).setToken(token);

// // Discordサーバーにコマンドを登録
// (async () => {
//   try {
//     await rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
//       body: commands,
//     });
//     console.log("サーバー固有のコマンドが登録されました！");
//   } catch (error) {
//     console.error("コマンドの登録中にエラーが発生しました:", error);
//   }
// })();

// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const { Client, Events, GatewayIntentBits } = require("discord.js");

// 設定ファイルからトークン情報を呼び出し、変数に保存します
const { token } = require("./config.json");

// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

// ログインします
client.login(token);

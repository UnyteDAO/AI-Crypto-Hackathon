const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();
// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
// discord botの初期化
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const {
  createNewPage,
  isFirstMessageIdExists,
  updatePage,
  isStatusActive,
} = require("./notion");
// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, (c) => {
  console.log(`I'm listening on... (${c.user.tag} is logged in.)`);

  // メッセージが送信されたときに実行されます
  client.on(Events.MessageCreate, async (message) => {
    const maxHistoryNumber = 20;
    let cleanMessage = `${message.author.username}: ${message.cleanContent}`;
    let FirstMessageId = "";
    let userIds = [];
    userIds.push(message.author.id);

    const createMessageHistory = async (message, prevMessages = []) => {
      userIds.some((userId) => userId === message.author.id)
        ? null
        : userIds.push(message.author.id);
      cleanMessage = `${message.author.username}: ${message.cleanContent}`;
      const messages = [cleanMessage, ...prevMessages];
      if (message.reference && messages.length < maxHistoryNumber) {
        const ref = await message.channel.messages.fetch(
          message.reference.messageId
        );
        return await createMessageHistory(ref, messages);
      } else {
        FirstMessageId = message.id;
        return messages;
      }
    };

    const history = await createMessageHistory(message);
    userIds = userIds.map((userId) => ({ name: userId }));
    const existingFirstMessageIdExists = await isFirstMessageIdExists(
      FirstMessageId
    );

    if (!existingFirstMessageIdExists) {
      console.log("FirstMessageId is not existing.");
      await createNewPage(message, FirstMessageId, history, userIds);
    } else {
      console.log("FirstMessageId is found.");
      const existingStatusActive = await isStatusActive(FirstMessageId);
      console.log("existingStatusActive: ", existingStatusActive);
      if (existingStatusActive) {
        console.log("FirstMessageId is found, and Status is active.");
        await updatePage(existingFirstMessageIdExists, history, userIds);
      }
    }
  });
});

// login
client.login(process.env.D_TOKEN);

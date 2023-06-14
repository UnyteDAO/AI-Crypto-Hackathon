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
    let oldestMessageId = "";
    const createMessageHistory = async (message, prevMessages = []) => {
      cleanMessage = `${message.author.username}: ${message.cleanContent}`;
      const messages = [cleanMessage, ...prevMessages];
      if (message.reference && messages.length < maxHistoryNumber) {
        const ref = await message.channel.messages.fetch(
          message.reference.messageId
        );
        return await createMessageHistory(ref, messages);
      } else {
        oldestMessageId = message.id;
        return messages;
      }
    };
    const history = await createMessageHistory(message);
    await sendToNotion(message, oldestMessageId, history);
  });
});

const sendToNotion = async (message, oldestMessageId, history) => {
  let newHistory = history;
  const formattedArr = newHistory.map((item) => {
    const [key, value] = item.split(": ");
    return `\`${key}\`: \`${value}\`\n-----`;
  });
  newHistory = formattedArr.join("\n");

  const options = {
    method: "POST",
    url: "https://api.notion.com/v1/pages",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.N_TOKEN,
    },
    data: {
      parent: {
        database_id: "ad9d405ef0574f6eaf061574d50d5178",
      },
      properties: {
        Id: {
          title: [
            {
              text: {
                content: crypto.randomUUID(),
              },
            },
          ],
        },
        GuildId: {
          rich_text: [
            {
              text: {
                content: message.guild.id,
              },
            },
          ],
        },
        ChannelId: {
          rich_text: [
            {
              text: {
                content: message.channel.id,
              },
            },
          ],
        },
        LastMessageId: {
          rich_text: [
            {
              text: {
                content: oldestMessageId,
              },
            },
          ],
        },
        History: {
          rich_text: [
            {
              text: {
                content: newHistory,
              },
            },
          ],
        },
        RawHistory: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(history),
              },
            },
          ],
        },
        CreatedAt: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(Date.now()),
              },
            },
          ],
        },
        UserIds: {
          multi_select: [
            {
              text: {
                content: "test",
              },
            },
            {
              text: {
                content: "test2",
              },
            },
          ],
        },
      },
    },
  };
  try {
    const response = await axios.request(options);
    console.log("T");
  } catch (error) {
    console.error(error);
    return null;
  }
};

// ログインします
client.login(process.env.D_TOKEN);

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
  console.log(`準備OKです! ${c.user.tag}がログインします。`);

  // メッセージが送信されたときに実行されます
  client.on(Events.MessageCreate, async(message) => {
    const maxHistoryNumber = 20;
    let cleanMessage = `${message.author.username}: ${message.cleanContent}`;
    let oldestMessageId = '';
    const createMessageHistory = async (message, prevMessages = []) => {
      cleanMessage = `${message.author.username}: ${message.cleanContent}`;
      const messages = [cleanMessage, ...prevMessages];
      if (message.reference && messages.length < maxHistoryNumber) {
        const ref = await message.channel.messages.fetch(
          message.reference.messageId
        );
        return await createMessageHistory(ref, messages);
      } else {
        oldestMessageId = message.id
        return messages;
      }
    };
    const history = await createMessageHistory(message);
    console.log(history);
    console.log("notionに書き込むメッセージID：",oldestMessageId);
    console.log("チャンネルID：",message.channel.id);
    console.log("ギルドID：",message.guild.id);
  });
  
});

// ログインします
client.login(process.env.TOKEN);

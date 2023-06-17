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
const { getSummaryAndTask, getTaskType } = require("./openai");

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
        await updatePage(
          existingFirstMessageIdExists,
          message,
          FirstMessageId,
          history,
          userIds
        );
      }
    }
  });
});

const createNewPage = async (message, FirstMessageId, history, userIds) => {
  let newHistory = history;
  const formattedArr = newHistory.map((item, index, array) => {
    const [key, value] = item.split(": ");
    return index < array.length - 1
      ? `\`${key}\`: \`${value}\`\n-----`
      : `\`${key}\`: \`${value}\``;
  });
  newHistory = formattedArr.join("\n");
  const sammaryAndTask = await getSummaryAndTask(cleanMessage); // [summary, task]
  const taskType = await getTaskType(sammaryAndTask[1], sammaryAndTask[0]);

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
        FirstMessageId: {
          rich_text: [
            {
              text: {
                content: FirstMessageId,
              },
            },
          ],
        },
        FirstMessageCreatedAt: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(message.createdTimestamp),
              },
            },
          ],
        },
        Status: {
          select: {
            name: "active",
          },
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
        GPTSummary: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(sammaryAndTask[0]),
              },
            },
          ],
        },
        GPTTask: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(sammaryAndTask[1]),
              },
            },
          ],
        },
        GPTTaskType: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(taskType),
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
          multi_select: userIds,
        },
      },
    },
  };
  try {
    const response = await axios.request(options);
    console.log("T");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const isFirstMessageIdExists = async (FirstMessageId) => {
  const options = {
    method: "POST",
    url: "https://api.notion.com/v1/databases/ad9d405ef0574f6eaf061574d50d5178/query",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.N_TOKEN,
    },
    data: {
      filter: {
        property: "FirstMessageId",
        rich_text: {
          equals: FirstMessageId,
        },
      },
    },
  };
  try {
    const response = await axios.request(options);
    console.log("success");
    return response.data &&
      response.data.results &&
      response.data.results.length === 0
      ? false
      : response.data.results[0].id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const isStatusActive = async (FirstMessageId) => {
  const options = {
    method: "POST",
    url: "https://api.notion.com/v1/databases/ad9d405ef0574f6eaf061574d50d5178/query",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.N_TOKEN,
    },
    data: {
      filter: {
        and: [
          {
            property: "FirstMessageId",
            rich_text: {
              equals: FirstMessageId,
            },
          },
          {
            property: "Status",
            select: {
              equals: "active",
            },
          },
        ],
      },
    },
  };
  try {
    const response = await axios.request(options);
    console.log("success");
    return response.data &&
      response.data.results &&
      response.data.results.length === 0
      ? false
      : response.data.results[0].id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const updatePage = async (pageId, history, userIds) => {
  let newHistory = history;
  const formattedArr = newHistory.map((item, index, array) => {
    const [key, value] = item.split(": ");
    return index < array.length - 1
      ? `\`${key}\`: \`${value}\`\n-----`
      : `\`${key}\`: \`${value}\``;
  });
  newHistory = formattedArr.join("\n");
  const sammaryAndTask = await getSummaryAndTask(cleanMessage); // [summary, task]
  const taskType = await getTaskType(sammaryAndTask[1], sammaryAndTask[0]);

  const options = {
    method: "PATCH",
    url: `https://api.notion.com/v1/pages/${pageId}`,
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.N_TOKEN,
    },
    data: {
      properties: {
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
        GPTSummary: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(sammaryAndTask[0]),
              },
            },
          ],
        },
        GPTTask: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(sammaryAndTask[1]),
              },
            },
          ],
        },
        GPTTaskType: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(taskType),
              },
            },
          ],
        },
        UpdatedAt: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(Date.now()),
              },
            },
          ],
        },
        UserIds: {
          multi_select: userIds,
        },
      },
    },
  };
  try {
    const response = await axios.request(options);
    console.log("T");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// login
client.login(process.env.D_TOKEN);

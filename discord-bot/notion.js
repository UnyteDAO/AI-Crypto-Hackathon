const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();
const { getSummaryAndTask, getTaskType } = require("./openai");

// タスクを「- 」で区切って配列にする関数
const classifyTasks = async (tasks, summary) => {
  const taskArr = tasks.split("\n");
  const tasksEdited = taskArr.map((item) => {
    return item.replace("- ", "");
  });
  // taskごとにタスクタイプを取得し、レスポンスに追加
  const response = [];
  for (let i = 0; i < tasksEdited.length; i++) {
    const taskType = await getTaskType(tasksEdited[i], summary);
    const json = {
      name: tasksEdited[i],
      type: taskType,
    };
    response.push(json);
  }
  return response;
};

const createNewPage = async (message, FirstMessageId, history, userIds) => {
  let newHistory = history;
  const formattedArr = newHistory.map((item, index, array) => {
    const [key, value] = item.split(": ");
    return index < array.length - 1
      ? key + ": " + value + "\n-----"
      : key + ": " + value;
  });
  newHistory = formattedArr.join("\n");
  const sammaryAndTask = await getSummaryAndTask(newHistory); // [summary, task]
  // タスクを「- 」で区切って配列にし、タスクタイプを取得
  const taskType = await classifyTasks(sammaryAndTask[1], sammaryAndTask[0]);

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
        database_id: process.env.N_DB_ID,
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
                content: String(newHistory),
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
                content: sammaryAndTask[0],
              },
            },
          ],
        },
        GPTTask: {
          rich_text: [
            {
              text: {
                content: sammaryAndTask[1],
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
    console.log("[result] success: createNewPage");
    console.log(response.data.id);
  } catch (error) {
    console.error(error);
  }
};

const isFirstMessageIdExists = async (FirstMessageId) => {
  const options = {
    method: "POST",
    url: `https://api.notion.com/v1/databases/${process.env.N_DB_ID}/query`,
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
    console.log("[result] success: isFirstMessageIdExists");
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
    url: `https://api.notion.com/v1/databases/${process.env.N_DB_ID}/query`,
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
    console.log("[result] success: isStatusActive");
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
      ? key + ": " + value + "\n-----"
      : key + ": " + value;
  });
  newHistory = formattedArr.join("\n");
  const sammaryAndTask = await getSummaryAndTask(newHistory); // [summary, task]
  // タスクを「- 」で区切って配列にし、タスクタイプを取得
  const taskType = await classifyTasks(sammaryAndTask[1], sammaryAndTask[0]);

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
                content: String(newHistory),
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
                content: sammaryAndTask[0],
              },
            },
          ],
        },
        GPTTask: {
          rich_text: [
            {
              text: {
                content: sammaryAndTask[1],
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
    console.log("[result] success: updatePage");
    console.log(response.data.id);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createNewPage,
  isFirstMessageIdExists,
  updatePage,
  isStatusActive,
};

import { UsersIcon } from "@heroicons/react/24/outline";

const getTasks = async (nextCursor = "") => {
  try {
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/tasks?start=${nextCursor}`,
      {
        method: "GET",
        compress: true,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson = await response.json();

    const results = responseJson.results.map((item) => {
      const id = item.id;
      const guildId = item.properties.guildId.rich_text[0].plain_text;
      const channelId = item.properties.channelId.rich_text[0].plain_text;
      const messageId = item.properties.id.title[0].plain_text;
      const summary = item.properties.summary.rich_text[0].plain_text;
      const tasks = item.properties.tasks.rich_text[0].plain_text;
      const date = item.properties.date.date.start;
      return { id, guildId, channelId, messageId, date, summary, tasks };
    });

    return {
      tasks: results,
      hasMore: responseJson.has_more,
      nextCursor: responseJson.next_cursor,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getGuilds = async (guildId = "") => {
  try {
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/guild?id=${guildId}`,
      {
        method: "GET",
        compress: true,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();
    const results = responseJson.results.map((item) => {
      const id = item.id;
      const guildId = item.properties.guildId.title[0].plain_text;
      const guildName = item.properties.name.rich_text[0].plain_text;
      const iconUrl = item.properties.iconUrl.rich_text[0].plain_text;
      return { id, guildId, guildName, iconUrl };
    });
    return {
      guilds: results,
      hasMore: responseJson.has_more,
      nextCursor: responseJson.next_cursor,
    };
  } catch (error) {
    return [];
  }
};

const getUsers = async (address = "") => {
  try {
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/user?address=${address}`,
      {
        method: "GET",
        compress: true,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();
    const results = responseJson.results.map((item) => {
      const id = item.id;
      const address = item.properties.walletAddress.title[0].plain_text;
      const userName = item.properties.userName.rich_text[0].plain_text;
      const userId = item.properties.userId.rich_text[0].plain_text;
      const iconUrl = item.properties.iconUrl.rich_text[0].plain_text;
      return { id, address, userId, userName, iconUrl };
    });
    return {
      users: results,
      hasMore: responseJson.has_more,
      nextCursor: responseJson.next_cursor,
    };
  } catch (error) {
    return [];
  }
};

const addAssign = async (address, taskItem, checkedList) => {
  try {
    if (!address) throw new Error("Require wallet connected.");

    const requestData = {
      id: taskItem.id,
      address: address,
      indexes: checkedList,
    };

    console.log(requestData);

    //https://3emm6xaoyufyll6xdmocaxmrou0ogrfi.lambda-url.ap-northeast-1.on.aws/
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/assign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        compress: true,
        body: JSON.stringify(requestData),
      }
    );

    if (!response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("追加失敗", { caluse: error });
  }
};

const getAssign = async (id) => {
  try {
    if (!id) throw new Error("Require id");
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/user?address=${address}`,
      {
        method: "GET",
        compress: true,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();

    const results = responseJson.results.map((item) => {
      const id = item.id;
      const address = item.properties.assignUserAddress.rich_text[0].plain_text;
      const taskIndexes = item.properties.tasksIndexies.multi_select.map(
        (taskIndex) => {
          return parseInt(taskIndex.name);
        }
      );
      return { id, address, taskIndexes };
    });

    return {
      tasks: results,
      hasMore: responseJson.has_more,
      nextCursor: responseJson.next_cursor,
    };
  } catch (error) {
    console.error(error.message);
  }
};

const mintAssignToken = async (address, taskItem) => {
  try {
    if (!taskItem) throw new Error("Require taskItem");
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/getAssign?id=${taskItem.id}`,
      {
        method: "GET",
        compress: true,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();

    const recievers = {};
    responseJson.results.map((item) => {
      const address = item.properties.assignUserAddress.rich_text[0].plain_text;
      for (const taskIndex of item.properties.tasksIndexies.multi_select) {
        recievers[taskIndex.name] = [
          ...(recievers[taskIndex.name] ?? []),
          address,
        ];
      }
    });

    let tasks = [];
    for (const [index, address] of Object.entries(recievers)) {
      tasks = [
        ...tasks,
        {
          recipient: { walletAddress: address },
          task: { name: "", id: `${taskItem.id}-${index}` },
        },
      ];
    }

    const usersInfo = await getUsers(address);
    const guildsInfo = await getGuilds(taskItem.guildId);

    const results = {
      status: "doing",
      team: {
        name: guildsInfo.guilds[0].guildName,
        id: guildsInfo.guilds[0].guildId,
        avatarID: guildsInfo.guilds[0].iconUrl,
      },
      requester: {
        name: usersInfo.users[0].userName,
        id: usersInfo.users[0].userId,
        avatarID: usersInfo.users[0].iconUrl,
      },
      tasks: tasks,
    };

    console.log(results);

    return results;
  } catch (error) {
    console.error(error.message);
  }
};

const mintCompletionToken = async (address, taskItem, checkedList) => {
  try {
    if (!address) throw new Error("Require wallet connected.");
    console.log(`Mint completion token ${taskItem.id} by ${address}`);
  } catch (error) {
    console.error(error);
  }
};

//mintAssignToken("3cc1ab2f-a6eb-421d-ac29-b4015dc48b7a","0xd868A066FC7501FE3f7C93067B0D52DB493076Fb","945194711973498920");

export {
  getTasks,
  getUsers,
  addAssign,
  getAssign,
  mintAssignToken,
  mintCompletionToken,
};

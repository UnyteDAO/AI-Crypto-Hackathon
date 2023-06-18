const TaskStatus = Object.freeze({
  active: 1,
  fixed: 2,
  completed: 3,
});

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

    const usersResults = await getUsers();

    const results = responseJson.results.map((item) => {
      const id = item.id;
      const guildId = item.properties.guildId.rich_text[0].plain_text;
      const channelId = item.properties.channelId.rich_text[0].plain_text;
      const messageId = item.properties.id.title[0].plain_text;
      const summary = item.properties.summary.rich_text[0].plain_text;
      const assigns = {
        users: item.properties.assigns.rollup.array
          .map((data) => {
            const result = JSON.parse(data.formula.string);
            const target  = usersResults.users.find((user) => user.address == result.assignUserAddress)
            if(target){
              result.iconUrl = target.iconUrl
              result.name = target.userName
            }else{
              result.iconUrl = ""
              result.name = ""
            }
            return result;
          })
          .filter((assign) => assign.tasksIndexes.length > 0)
      };

      let indexes = {};
      assigns.users.forEach((item) => {
        item.tasksIndexes.forEach((index) => {
          if (!indexes[index]) {
            indexes[index] = [];
          }
          indexes[index] = [...indexes[index], item.assignUserAddress];
        });
      });

      assigns.indexes = indexes;

      let status = TaskStatus.active;
      if (item.properties.status.select?.name === "fixed") {
        status = TaskStatus.fixed;
      } else if (item.properties.status.select?.name === "completed") {
        status = TaskStatus.completed;
      }

      let tasks = [];
      const regx = /- \[ \] (.+)\n?/g;
      const matches = item.properties.tasks.rich_text[0].plain_text.match(regx);
      if (matches) {
        for (const match of matches) {
          tasks = [
            ...tasks,
            { name: match.replace("- [ ] ", ""), checked: false },
          ];
        }
      }

      const date = item.properties.date.date.start;
      return {
        id,
        guildId,
        channelId,
        messageId,
        date,
        summary,
        status,
        tasks,
        assigns,
      };
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
      const iconUrl = item.properties.iconUrl.rich_text[0].plain_text;
      return { id, address, userName, iconUrl };
    });
    return {
      users: results,
      hasMore: responseJson.has_more,
      nextCursor: responseJson.next_cursor,
    };
  } catch (error) {
    console.log(error.message)
    return [];
  }
};

const addAssign = async (address, taskItem) => {
  try {
    if (!address) throw new Error("Require wallet connected.");

    const indexes = taskItem.tasks.map((task) => {
      return task.checked;
    });

    const requestData = {
      id: taskItem.id,
      address: address,
      indexes: indexes,
    };

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

    const usersResults = await getUsers(address);
    return usersResults.users;
  } catch (error) {
    console.error(error);
    throw new Error("追加失敗", { caluse: error });
  }
};

const getAssign = async (address) => {
  try {
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/getAssign?address=${address}`,
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
      const id = item.properties.id.title[0].plain_text;
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
        const isSelected = taskItem.tasks[taskIndex.name].checked;
        if (isSelected) {
          recievers[taskIndex.name] = [
            ...(recievers[taskIndex.name] ?? []),
            address,
          ];
        }
      }
    });

    let tasks = [];
    for (const [index, address] of Object.entries(recievers)) {
      if (address.length > 0) {
        const taskName = taskItem.tasks[index].name;
        tasks = [
          ...tasks,
          {
            walletAddress: address,
            task: { name: taskName, id: `${taskItem.id}-${index}` },
          },
        ];
      }
    }

    if (tasks.length === 0) {
      throw new Error("アサインされたタスクがありません。");
    }

    const usersInfo = await getUsers(address);
    const guildsInfo = await getGuilds(taskItem.guildId);

    const requestData = {
      status: "doing",
      team: {
        name: guildsInfo.guilds[0].guildName,
        id: guildsInfo.guilds[0].guildId,
        avatarURL: guildsInfo.guilds[0].iconUrl,
      },
      requester: {
        name: usersInfo.users[0].userName,
        id: usersInfo.users[0].userId,
        avatarURL: usersInfo.users[0].iconUrl,
      },
      tasks: tasks,
    };

    await updateStatus(taskItem, "fixed");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    const mintResponse = await fetch(
      "https://a5guh723j5wcy2ns7vopdfjcu40qukfn.lambda-url.ap-northeast-1.on.aws/",
      options
    );

    const mintResponseJson = await mintResponse.json();

    return mintResponseJson;
  } catch (error) {
    console.error(error.message);
    return { status: "error", message: error.message };
  }
};

const mintCompletionToken = async (address, taskItem) => {
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
        const isSelected = taskItem.tasks[taskIndex.name].checked;
        if (isSelected) {
          recievers[taskIndex.name] = [
            ...(recievers[taskIndex.name] ?? []),
            address,
          ];
        }
      }
    });

    let tasks = [];
    for (const [index, address] of Object.entries(recievers)) {
      if (address.length > 0) {
        const taskName = taskItem.tasks[index].name;
        tasks = [
          ...tasks,
          {
            walletAddress: address,
            task: { name: taskName, id: `${taskItem.id}-${index}` },
          },
        ];
      }
    }

    if (tasks.length === 0) {
      throw new Error("アサインされたタスクがありません。");
    }

    const usersInfo = await getUsers(address);
    const guildsInfo = await getGuilds(taskItem.guildId);

    await updateStatus(taskItem, "completed");

    const requestData = {
      status: "done",
      team: {
        name: guildsInfo.guilds[0].guildName,
        id: guildsInfo.guilds[0].guildId,
        avatarURL: guildsInfo.guilds[0].iconUrl,
      },
      requester: {
        name: usersInfo.users[0].userName,
        id: usersInfo.users[0].userId,
        avatarURL: usersInfo.users[0].iconUrl,
      },
      tasks: tasks,
    };

    console.log(requestData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    const mintResponse = await fetch(
      "https://a5guh723j5wcy2ns7vopdfjcu40qukfn.lambda-url.ap-northeast-1.on.aws/",
      options
    );

    const mintResponseJson = await mintResponse.json();

    return mintResponseJson;
  } catch (error) {
    console.error(error.message);
    return { status: "error", message: error.message };
  }
};

const updateStatus = async (taskItem, status) => {
  try {
    const requestData = {
      id: taskItem.id,
      status: status,
    };

    console.log(requestData);

    //https://3emm6xaoyufyll6xdmocaxmrou0ogrfi.lambda-url.ap-northeast-1.on.aws/
    const response = await fetch(
      `https://notionmanager.ukishima.repl.co/status`,
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
    throw new Error("ステータス更新失敗", { caluse: error });
  }
};

export {
  getTasks,
  getUsers,
  addAssign,
  getAssign,
  mintAssignToken,
  mintCompletionToken,
  updateStatus,
};

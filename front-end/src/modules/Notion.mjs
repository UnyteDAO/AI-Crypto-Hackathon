import axios from "axios";

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
      const channelId = item.properties.channelId.rich_text[0].plain_text;
      const messageId = item.properties.id.title[0].plain_text;
      const summary = item.properties.summary.rich_text[0].plain_text;
      const tasks = item.properties.tasks.rich_text[0].plain_text;
      const date = item.properties.date.date.start;
      return { id, channelId, messageId, date, summary, tasks };
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
    // const response = await fetch(
    //   `https://notionmanager.ukishima.repl.co/assign`,
    //   {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     compress: true,
    //     body: JSON.stringify(requestData),
    //   }
    // );

    let headersList = {
      "Content-Type": "application/json",
    };

    let reqOptions = {
      //url: "https://3emm6xaoyufyll6xdmocaxmrou0ogrfi.lambda-url.ap-northeast-1.on.aws/",
      url: "https://notionmanager.ukishima.repl.co/assign",
      method: "POST",
      headers: headersList,
      data: JSON.stringify(requestData),
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);

    // if (!response) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
  } catch (error) {
    console.error(error);
    throw new Error("追加失敗", { caluse: error });
  }
};

const mintAssignToken = async (address, taskItem, checkedList) => {
  try {
    if (!address) throw new Error("Require wallet connected.");
    console.log(`Mint assign token ${taskItem.id} by ${address}`);
  } catch (error) {
    console.error(error);
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

export { getTasks, getUsers, addAssign, mintAssignToken, mintCompletionToken };

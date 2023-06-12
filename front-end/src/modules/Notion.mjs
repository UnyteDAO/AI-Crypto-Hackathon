const getTasks = async (nextCursor="") => {
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
      const channelId = item.properties.channelId.rich_text[0].plain_text;
      const summary = item.properties.summary.rich_text[0].plain_text;
      const tasks = item.properties.tasks.rich_text[0].plain_text;
      const date = item.properties.date.date.start;
      return { channelId, date, summary, tasks };
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
export { getTasks };

const getTasks = async () => {
  const response = await fetch("https://notionmanager.ukishima.repl.co/tasks");
  const responseJson = await response.json();
  const result = responseJson.results.map((data) => {
    const channelId = data.properties.channelId.rich_text[0].plain_text;
    const summary = data.properties.summary.rich_text[0].plain_text;
    const tasks = data.properties.tasks.rich_text[0].plain_text;
    const date = data.properties.date.date.start;
    return { channelId: channelId, date: date, summary: summary, tasks: tasks };
  });
  return result;
};

export { getTasks };

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OAI_TOKEN,
});
const openai = new OpenAIApi(configuration);

const getSummaryAndTask = async (rawText) => {
  // モデルに渡すプロンプトを作成する
  const modelPromptSummary = `chatlog: ${rawText}\n\n{chatlog}の要約:`;

  // モデルに問い合わせる
  const completionSummary = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: modelPromptSummary }],
  });

  const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}を受け生まれたチームとしてのタスク(箇条書き):`;
  const completionTask = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: modelPromptTask }],
  });

  console.log(completionSummary.data.choices[0].message);
  console.log(completionTask.data.choices[0].message);
  return [
    completionSummary.data.choices[0].message,
    completionTask.data.choices[0].message,
  ];
};

const getTaskType = async (task, summary) => {
  const choices = [
    "開発",
    "ビジネス",
    "デザイン",
    "コミュニティマネジメント",
    "その他",
  ];
  const gptRole = "user";
  const gptModel = "gpt-3.5-turbo";

  const modelPrompt = `タスク: ${task}\n背景: ${summary}\n選択肢: ${choices.join(
    ", "
  )}\n\n最も近い選択肢:`;

  const completion = await openai.createChatCompletion({
    model: gptModel,
    messages: [{ role: gptRole, content: modelPrompt }],
  });

  return completion.data.choices[0].message;
};

module.exports = { getSummaryAndTask, getTaskType };

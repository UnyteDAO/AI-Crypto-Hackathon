const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OAI_TOKEN,
});
const openai = new OpenAIApi(configuration);

const createGPTSummaryRecursive = async (modelPromptSummary, retries = 10) => {
  if (retries <= 0) {
    throw new Error("Retry limit exceeded for createGPTSumary");
  }
  try {
    return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: modelPromptSummary }],
    });
  } catch (error) {
    console.log("createGPTSumary error: " + error);
    return createGPTSummaryRecursive(modelPromptSummary, retries - 1);
  }
};

const createGPTTaskRecursive = async (modelPromptTask, retries = 10) => {
  if (retries <= 0) {
    throw new Error("Retry limit exceeded for createGPTTask");
  }
  try {
    return await await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: modelPromptTask }],
    });
  } catch (error) {
    console.log("createGPTTask error: " + error);
    return createGPTTaskRecursive(modelPromptTask, retries - 1);
  }
};

const createChatCompletionRecursive = async (model, messages, retries = 10) => {
  if (retries <= 0) {
    throw new Error("Retry limit exceeded for createChatCompletion");
  }
  try {
    return await openai.createChatCompletion({ model, messages });
  } catch (error) {
    console.log("createChatCompletion error: " + error);
    return createChatCompletionRecursive(model, messages, retries - 1);
  }
};

const getSummaryAndTask = async (rawText) => {
  // prompts
  const modelPromptSummary = `chatlog: ${rawText}\n\n{chatlog}の要約（仕様：日本語、誰が何を言ったか・実行したかを明確に）：`;
  const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれる「今後」行うTo do(仕様：日本語、箇条書き、既に完了済みの内容や文章から読み取れる内容以上のことはTo doに含めずに)：`;

  let completionSummary = null;
  let completionTask = null;

  try {
    completionSummary = await createGPTSummaryRecursive(modelPromptSummary);
    completionTask = await createGPTTaskRecursive(modelPromptTask);
  } catch (error) {
    console.error("getSummaryAndTask error: " + error);
  }

  return completionSummary.data && completionTask.data
    ? [
        completionSummary.data.choices[0].message.content,
        completionTask.data.choices[0].message.content,
      ]
    : [completionSummary, completionTask];
};

const getTaskType = async (task, summary) => {
  const choices = [
    "開発",
    "BizDev",
    "デザイン",
    "コミュニティマネジメント",
    "マーケティング",
    "営業",
    "その他",
  ];
  const gptRole = "user";
  const gptModel = "gpt-3.5-turbo";

  const modelPrompt = `タスク: ${task}\n背景: ${summary}\n選択肢: ${choices.join(
    ", "
  )}\n\n最も近い選択肢:`;

  const completion = await createChatCompletionRecursive(gptModel, [
    { role: gptRole, content: modelPrompt },
  ]);

  return completion.data
    ? completion.data.choices[0].message.content
    : completion;
};

module.exports = { getSummaryAndTask, getTaskType };

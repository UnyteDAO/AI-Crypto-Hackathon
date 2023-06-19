const axios = require("axios");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OAI_TOKEN,
});
const openai = new OpenAIApi(configuration);

// history
const history = `0xuyz: AI+Cryptoハッカソンの成果物をテストしたい ----- ukishima: どういう手順でやりますかねぇ。----- 0xuyz: まずは今あるコードの挙動をテストするところから始めようと思います。 ----- ukishima: テスト範囲を明確にて分担してやりたいですね。`;
// AI-Dummy: 18行目
const history2 = `ukishima: <@&1075250143584059472>  AI Botの接続先を、Azureのスタートアッププログラムを使った Azure OpenAIに変更し、接続、Embedding、質問送信、回答について基本的な動作を確認しました。 https://www.notion.so/unyte/Azure-AI-c53f9c18983c4283a117e31cf7f6427c?pvs=4`;
// AI-Dummy: 21行目
const history3 = `"Tyche: <@710388387726753852> <@488544515976724480> 
さっきNotion内にUwaizumiさんが作ってくれた「AI活用ユーザーテスト」というシートなのですが、
Notion Home > リサーチ結果 > Research Repeat
というディレクトリの中に入っていて顧客DBと紐づいてないため、個別の顧客の状況が把握しにくいです…
なんかいい方法ありますか？
(当方notion1年生のため、使い方がわかってないだけなら、教えて頂きたく…🙇)
-----
Uwaizumi｜🔗UnyteDAO Founder: うちには天才がいます
-----
Tyche: キャーーー素敵！！！
ありがとうございます💗"`;
// AI-Dummy: 38行目
const history4 = `Uwaizumi｜🔗UnyteDAO Founder: @everyone Roopt DAOさんでも有料にて利用継続いただけることが決定しました！！
RooptさんはDAOらしく、Snapshotで決議いただきました。
そして有難いことに満場一致、かつ過去2番目の賛成数(15RPT)にて可決いただいております！！！感謝！！
https://snapshot.org/#/roopt.eth/proposal/0x6f7d6c71f3285c2223b6138a38ddca57d30d74f170f81adb549a91a76c5d70ca`;
// AI-Dummy: 78行目
const history5 = `Uwaizumi｜🔗UnyteDAO Founder: すみません開発で詰まってて見れてませんでした！
-----
Tyche: 請求書とは別に、お時間ある時で構いませんので経理相談お願いしますわよー
-----
Uwaizumi｜🔗UnyteDAO Founder: 今日これから会議で、その後親子丼さんとご飯なんですよね、、5分くらいでよければ会議後お時間取れるかもです、18時スタート想定でも良いでしょうkぁ？
-----
Tyche: 明日以降とかでも大丈夫わよ
親子丼さんと楽しんでねー！
-----
Uwaizumi｜🔗UnyteDAO Founder: すみませんギリギリまで会議でした、、明日17時ごろご都合いかがでしょうか、、
-----
Tyche: ミーティングおつかれさま！
明日で大丈夫わよー

親子丼さんとお約束あるなか、コメントありがとうわよ。
よろしくお伝えくださいねー。親子丼さんらぶ🫶`;
// string ai
const RawHistory = `["0xuyz: AI+Cryptoハッカソンの成果物をテストしたい","ukishima: どういう手順でやりますかねぇ。","0xuyz: まずは今あるコードの挙動をテストするところから始めようと思います。","ukishima: テスト範囲を明確にて分担してやりたいですね。"]`;
const authorAndContent = [
  {
    発言者: "ukishima",
    発言内容: "おはよう",
  },
  {
    発言者: "ukishima",
    発言内容: "今日のタスクは、朝ごはんを作ることです。",
  },
  {
    発言者: "ukishima",
    発言内容: "今日のタスクは、みかんの木への水やりです。",
  },
  {
    発言者: "togase",
    発言内容: "こんばんは",
  },
  {
    発言者: "togase",
    発言内容: "夜ご飯を作ってください。",
  },
];

// task

getSummaryAndTask = async (rawText) => {
  // モデルに渡すプロンプトを作成する
  const modelPromptSummary = `chatlog: ${rawText}\n\n{chatlog}の要約（仕様：日本語、誰が何を言ったか・実行したかを明確に）：`;

  // モデルに問い合わせる
  const completionSummary = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: modelPromptSummary }],
  });

  const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれる「今後」行うTo do(仕様：日本語、箇条書き、既に完了済みの内容や文章から読み取れる内容以上のことはTo doに含めずに)：`;
  const completionTask = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: modelPromptTask }],
  });

  console.log("summary: ");
  console.log(completionSummary.data.choices[0].message.content);
  console.log("=====");
  console.log("task: ");
  console.log(completionTask.data.choices[0].message.content);
  console.log("=====");
  return [
    completionSummary.data.choices[0].message.content,
    completionTask.data.choices[0].message.content,
  ];
};

getTaskType = async (task, summary) => {
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

  const completion = await openai.createChatCompletion({
    model: gptModel,
    messages: [{ role: gptRole, content: modelPrompt }],
  });

  return completion.data.choices[0].message.content;
};

const main = async () => {
  await getSummaryAndTask(history5);
  // await getTaskType();
};

// main();

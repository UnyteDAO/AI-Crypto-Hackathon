// @notionhq/clientパッケージをインポート
const { Client } = require("@notionhq/client")
const axios = require("axios");
const fs = require("fs");

process.env.OPENAI_API_KEY = "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";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

process.env.NOTION_API_KEY = "secret_ymvJN8h14QZom8wBJXNb0wvPZVtRFHHFp3sbEmqNc83";
// notionAPIのキーを環境変数から取得
const notion = new Client({ auth: process.env.NOTION_API_KEY })

// データベースのIDを定義
const databaseId = "ad9d405ef0574f6eaf061574d50d5178"

// データベースから内容をfetchする関数
async function fetchDatabase() {
  try {
    // データベースにクエリを投げて結果を取得
    const options = {
        method: "POST",
        url: `https://api.notion.com/v1/databases/${databaseId}/query`,
        headers: {
        accept: "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json",
        Authorization: "Bearer " + process.env.NOTION_API_KEY,
        }
    };
    try {
        const response = await axios.request(options);
        // 結果をコンソールに表示
        return response.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
  } catch (error) {
    // エラーが発生した場合はコンソールに表示
    console.error(error.body)
  }
}

// データベースの内容を整形してコンソールに表示する関数
async function displayDatabase(data) {
    // データベースの内容をコンソールに表示
    let resultArray = [];
    for (const item of data) {
        if (item.properties.Summary.rich_text[0]!==undefined&&item.properties.Task.rich_text[0].plain_text!==undefined){
            const result = item.properties.Task.rich_text
            let i = 0;
            for (const task of result) {
                if (task.plain_text.length>=5){
                    const taskId = item.properties.Id.title[0].plain_text + "-" + i;
                    // taskIdが重複している場合はスキップ
                    const alreadySaved = await fetchNewTask(taskId);
                    if (alreadySaved) {
                        i++;
                    } else {
                        console.log(taskId);
                        resultArray.push({id: taskId,task: task.plain_text, type: answer.content});
                        const answer = await runPrompt(task.plain_text,item.properties.Summary.rich_text[0].plain_text,["開発", "ビジネス", "デザイン", "コミュニティマネジメント", "その他"]);
                        i++;
                    }
                }
            }
        }
    }
    return resultArray;
}

// jsonに保存されていないtaskを取得する関数
async function fetchNewTask(taskId) {
    let result = false;
    const data = fs.readFileSync('./json/log.json', 'utf8');
    const jsonBase = JSON.parse(data);
    // JSONファイルの中からidが一致するオブジェクトを探す
    for await (let item of jsonBase) {
        if (item.id === taskId) {
            // 見つかったらオブジェクトを返す
            result = true;   
        }
    }
    return result;
}

async function runPrompt(task,background,choices) {
  // モデルに渡すプロンプトを作成する
  const modelPrompt = `タスク: ${task}\n背景: ${background}\n選択肢: ${choices.join(", ")}\n\n最も近い選択肢:`;

  // モデルに問い合わせる
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: modelPrompt}],
  });

  // モデルの回答を返す
  return completion.data.choices[0].message;
}

// notionのプロパティに値を書き込む関数
async function writeToNotion(array) {
    for (const item of array) {
        // データベースにクエリを投げて結果を取得
        const databaseId = "8355f793f9ad4f07a0218a2321649943"
        const options = {
            method: "POST",
            url: `https://api.notion.com/v1/pages`,
            headers: {
            accept: "application/json",
            "Notion-Version": "2022-06-28",
            "content-type": "application/json",
            Authorization: "Bearer " + process.env.NOTION_API_KEY,
            },
            data: {
                "parent": { "database_id": databaseId },
                "properties": {
                    "Id": {
                        "title": [
                        {
                            "text": {
                            "content": item.id
                            }
                        }
                        ]
                    },
                    "Tags": {
                        "multi_select": [
                            {"name": item.type}
                        ]
                    },
                    "Task": {
                        "rich_text": [
                            {
                                "text": {
                                    "content": item.task
                                }
                            }
                        ]
                    }
                }
            }
        };
        try {
            const response = await axios.request(options);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
  }

// JSONにarrayを書き込む関数
async function writeToJson(array) {
    const jsonAdd = JSON.stringify(array);
    let mergedJson;
    fs.readFile('./json/log.json', function (err, data) {
        // データが取得できたら
        var jsonBase = JSON.parse(data);
        for (const item of array) {
            jsonBase.push(item);
        }
        mergedJson = JSON.stringify(jsonBase);
        console.log(mergedJson);
        // jsonへの書き込み
        fs.writeFileSync('./json/log.json', mergedJson, 'utf8');
    });
}

async function main() {
    const data = await fetchDatabase();
    const array = await displayDatabase(data);
    await writeToNotion(array);
    await writeToJson(array);
}

main();
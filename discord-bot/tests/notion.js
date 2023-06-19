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

const createNewPage = async (
  message = {
    guild: { id: "1116959856763600936" },
    channel: { id: "1118546453837652159" },
    createdTimestamp: 1627776000000,
  },
  FirstMessageId = "1687192683882",
  history,
  userIds = []
) => {
  let newHistory = history;
  // const formattedArr = newHistory.map((item, index, array) => {
  //   const [key, value] = item.split(": ");
  //   return index < array.length - 1
  //     ? key + ": " + value + "\n-----"
  //     : key + ": " + value;
  // });
  // newHistory = formattedArr.join("\n");
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

const chatlogs = [
  `ukishima: <@&1075250143584059472> 
  AI Botの接続先を、Azureのスタートアッププログラムを使った Azure OpenAIに変更し、接続、Embedding、質問送信、回答について基本的な動作を確認しました。
  
  https://www.notion.so/unyte/Azure-AI-c53f9c18983c4283a117e31cf7f6427c?pvs=4`,
  `Uwaizumi｜🔗UnyteDAO Founder: @everyone PANDAOさん、トライアル期間を終え無事本導入決定しました！！！！！

  手厚くサポートしてくださった <@981932546298351688> さん、本当にありがとうございます！
  -----
  Uwaizumi｜🔗UnyteDAO Founder: あおさんからお支払い確認できました！
  rooptさんは請求書での対応のため、来月振り込みいただきます！`,
  `Tyche: <@710388387726753852> <@488544515976724480> 
  さっきNotion内にUwaizumiさんが作ってくれた「AI活用ユーザーテスト」というシートなのですが、
  Notion Home > リサーチ結果 > Research Repeat
  というディレクトリの中に入っていて顧客DBと紐づいてないため、個別の顧客の状況が把握しにくいです…
  なんかいい方法ありますか？
  (当方notion1年生のため、使い方がわかってないだけなら、教えて頂きたく…🙇)
  -----
  Uwaizumi｜🔗UnyteDAO Founder: うちには天才がいます
  -----
  Tyche: キャーーー素敵！！！
  ありがとうございます💗`,
  `Tyche: <@719135943776534530> 
  CC <@710388387726753852> 
  DAOAsiaのDAO兄さんから初期トークンの発行依頼がきています
  1000トークン付与してほしいそうなのだけど、chaichaiさんにお願いすればいいのかしら？
  -----
  chaichai: 承知しました！
  Sonic daoも出来ておらずでしたので合わせて対応しておきます
  -----
  Tyche: 対応完了しましたら、DAO兄さんにご連絡よろしくお願いしますわよー
  https://discord.com/channels/1068105624103170079/1107869122953478164/1113065306588446761
  -----
  Tyche: <@719135943776534530> 
  リマインダー
  -----
  chaichai: ありがとうございます！付与しました！！
  -----
  Tyche: ご連絡お願いします🙇`,
  `Uwaizumi｜🔗UnyteDAO Founder: 依頼文案

  【次回スペースのアジェンダ案】
  
  明後日のスペースではよろしくお願いします！
  ざっくり⏬のようなフローでお話を伺えればと思っております！
  特に「コミュニティとして大切にしている思想」など、詳しく深掘りできると嬉しいです😊
  よろしければ、簡単にお話しされたい内容も考えておいていただけると嬉しいです…！
  
  - それぞれのDAOおよび参加者の自己紹介
  - コミュニティとしての方針や、大切にしている思想
  - Unyteの活用可能性
  -----
  Uwaizumi｜🔗UnyteDAO Founder: これ自分で作って送ってなかったの怖すぎる`,
  `Tyche: <@488544515976724480> 
  Notionのバッグログから一部の顧客名が消えてしまいました(PANDAOさんが無くて気がついた)
  フィードバック一覧のシートでも、顧客DBから引っ張ってすべての顧客名を入力したはずなのですが消えてしまっています…
  https://www.notion.so/unyte/2c8578d8a59b479a925be85941f262b4?v=b15907af1b6944b0a21ba63144d7403f&pvs=4
  なにか操作を誤ったでしょうか😭😭😭
  バッグログの運用は再検討としても、フィードバック一覧は進捗2Earnでも必要となるので、可能なら蘇らせて頂きたいです🙏(他にバックアップとっていません)
  -----
  ukishima: 5/25に誤って削除してしまっているようです。よくあることですが、少し期間がたってしまっているのでそこまでのロールバックはちょっと躊躇しますね。
  個別に戻せるかやってみますね。
  -----
  Tyche: お手数をおかけしてすみません😭😭😭
  ありがとうございます！
  -----
  ukishima: いえいえ。さっきも言ったように共同作業をしていればよくあることです。気づいてよかったです。
  とりあえず、顧客DBのPANDAOは戻しました。
  フィードバック一覧がどういう状態か確認してもらえますか？
  -----
  Tyche: フィードバック一覧は入力した通りに蘇ってるようです！
  バックログから消えていたPANDAO分も復活しました。
  ゾンビ対応助かりました。ありがとうございます🙏`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@&1075250143584059472> SONYさんの社内セミナーに出させていただくことになりました！
  追ってコミュニティの方でも告知します！
  https://m.facebook.com/story.php?story_fbid=pfbid0nVg9yTDwwNE31DheLMww3PTKSScmeeYCxUhbhLRXuNDjtwVH8kBdAyUAHxM1Fzzel&id=100003395834918`,
  `ukishima: AIxCRYPTOハッカソンについては、締め切りまでに定例もなく合意形成が難しいのと同時に、チームとして動ける状況ではなさそうなので、Unyteとしては不参加ということでよろしいでしょうか。確認です。
  <@710388387726753852> <@&1075250143584059472>
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 締切いつでしたっけ？！6月はある程度動ける状態なので私としては出たいところですが、 <@760809359646785566> <@1019620882580262952> はご都合いかがでしょうか…？
  -----
  yoshito: 6/10頃から全空きの予定です`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@719135943776534530> IVSのサイドイベント一緒に企画せーへん？
  イベント会場予約から運営まで含めてリードしてくれたら、起業DAOかAIの方で共催としてロゴ載せるし、費用もこっちで持とうと思う！
  -----
  chaichai: 6月の大枠割いて良いなら行けます！
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 大丈夫！！ありがとう！`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@981932546298351688> ivsのサイドイベント開催して、Unyteユーザーに集まってもらうのいいかもと思ったんですがどうでしょう？
  -----
  Tyche: どのくらい導入先さん参加されるんですかね。企業や自治体などの見込顧客は参加してそうな気もしますが…
  そういえば、@ BloctoApp がIVS京都のサイドイベントとしてビルダーミートアップのスポンサーとパートナー募集してましたね
  -----
  Uwaizumi｜🔗UnyteDAO Founder: それによりますよね！！1-2チームでもいれば、事例紹介としてご依頼できるので良い気がしまして。おっしゃる通り見込み顧客獲得の意味合いを大きくしたいところです`,
  `Uwaizumi｜🔗UnyteDAO Founder: @everyone Roopt DAOさんでも有料にて利用継続いただけることが決定しました！！

  RooptさんはDAOらしく、Snapshotで決議いただきました。
  そして有難いことに満場一致、かつ過去2番目の賛成数(15RPT)にて可決いただいております！！！感謝！！
  https://snapshot.org/#/roopt.eth/proposal/0x6f7d6c71f3285c2223b6138a38ddca57d30d74f170f81adb549a91a76c5d70ca`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@981932546298351688> <@719135943776534530> ありがとうございます！！ちょっと自分が別件で今日は参加できなそうでして。。
  テュケさん、申し訳ないのですがchaichaiくんに前回会議で得られた情報の共有お願いしても良いでしょうか🙇
  -----
  Tyche: まだあんまり心が通じてないので、ミーティングのスケジュールを仕切り直ししましょう`,
  `Tyche: <@710388387726753852> 
  来週5/31(水)のPANDAOさんとMETAKAWIIさんのスペースのリンクってまだ作ってなかったわよねー
  Unyteが立てたリンクいつまでにご連絡するとか話してましたっけ。
  AOさんのところでイベントスケジュールにすでに組み込まれていて、Cocoaさんのほうでも事前告知はスペースなどで少しずつはじめているのですが正式アナウンスは待ってる状態みたいで…
  
  スペースのリンク作って、シェアお願いしますわよー🙇
  -----
  Uwaizumi｜🔗UnyteDAO Founder: おおお承知しました！！リンクだけ作って後で告知ってできましたっけ。。？！
  -----
  Tyche: ［リマインダー］
  メタカワさんよりコミュニティ告知は、スペースのリンク待ちと連絡きてます`,
  `chaichai: <@710388387726753852> 
  営業資料、時間ある時に使いやすくしても良いですか？笑
  -----
  Uwaizumi｜🔗UnyteDAO Founder: あ、ぜひぜひ！！！
  これ、お客さんにそのまま渡せるようなやつで喋ってるから色々問題あるよね
  -----
  chaichai: 了解です！動画の部分等分かりづらい説明で申し訳ないので、新しいものに差し替えておきます！
  -----
  Uwaizumi｜🔗UnyteDAO Founder: お願いします！！！`,
  `Tyche: <@719135943776534530> 
  導入済みDAOについて、現在の状況をスプレッドシートにまとめて色付けしてあります
  bot導入日や契約状況等、Notionへの反映をお願いしますわよー
  
  共有フォルダ>BizDev>クライアント対応
  https://docs.google.com/spreadsheets/d/1biBObDbbJvRS4jWuzYPcULtelEjGyyuZdk13AZ9eI-8/edit?usp=drivesdk`,
  `Tyche: <@710388387726753852> 
  導入済み確認シートの記載ありがとうごさいましたわよー
  さらに請求の必要がある取引先さま分についてタスク投げておきましたので、よろしくお願いしますわよ。
  Uwaizumiさんも誰が使ってるか謎のご利用者さまはどうしますかね…
  1ヶ月経過したらbotを該当DAOのみ停止させる(アクセス拒否する)とか可能なのかしら？？
  -----
  Uwaizumi｜🔗UnyteDAO Founder: こちら可能です！将来的にそのような設計にしようと思っていたので、今がちょうど良いタイミングな気はします。`,
  `Tyche: <@488544515976724480> 
  頂いたFAQの文言修正、終わりました。
  Uwaizumiさんが出張中なので <@719135943776534530> さんとダブルチェックして頂いて、一旦流し込んでいただけますでしょうか？
  
  追加で必要な項目やよく聞かれそうな項目が思いつきましたら、シートに追記していきますので差分を取ってもらえればと思います。
  よろしくお願いします🙇
  
  共有フォルダ>BizDev>引き渡し用
  https://docs.google.com/spreadsheets/d/1q9wgtFSNHDaYwk8p6E0LkzQ0hPG4VJEW3765QSpfA1M/edit?usp=drivesdk
  -----
  ukishima: あとでしっかりと確認しようと思いますが、個人的には、黄色で網掛けした部分などは、できれば あと１文章考えたいですね。
  「〇〇とは？」=> 「〇〇です。」よりは「〇〇とは？」=>「〇〇です。ｘｘの△△です。」の方が 事務的にスパっときられた感はないですよね。
  -----
  Tyche: なるほどです。
  ゆなこちゃんらしい、暖かみのある文言に調整してみますね🫶
  -----
  ukishima: ありがとうございます。自分も多少は考えてみます。
  そのコマンドがある目的とか、Unyteがなぜそのコマンドを用意して、どう使ってほしいと思っているのかみたいなのが入るといいのかもな～とか個人的には思いました。
  
  どのみちアップデートは可能なものなので、無理のない程度 and 第一弾としてこれぐらいあれば説明はできるというBizとしての許容範囲までお願いできればと思います。
  -----
  Tyche: 黄色部分に愛嬌を加えてみました。
  文字数どのくらいが良いのかわからないのですが、どうでしょうか…
  -----
  ukishima: ちょっと別件に入っているので、夜に確認します。ありがとうございます。`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@&1075250143584059472> これめっちゃ面白い意見だと思います。直近は詰まっていますがどこかのタイミングで実装検討したいです。
  https://discord.com/channels/1068105624103170079/1069876792506208276/1111122038971715646
  -----
  ukishima: あってもよいかもしれませんが、思想的には微妙。というか、taskの考えからしても微妙かと。
  -----
  Uwaizumi｜🔗UnyteDAO Founder: そこですよね。。貢献によるトークンではなくあくまで保有によるものという面で思想には反します。。
  この「トークンの保有メリットを作り売上に繋げたい」的な発想からの意見をどう拾うか、チームで認識持っておきたいところですね、当面の顧客の要望に応えたい気持ちはありますが、Ukishimaさんが仰るように一貫性はなくなる気もしていて`,
  `ukishima: <@981932546298351688> <@719135943776534530> 
  マニュアルサイトの現状の文言については、雑ですが私の環境のスプレッドシートに転記しました。
  適当にコピーいただいて、追加/変更をよろしくお願いします。
  https://docs.google.com/spreadsheets/d/1vecrBLbkhhSJ_KcycPqIe8VVjR4-59oouDBpG9TdkLs/edit?usp=sharing
  -----
  Tyche: ありがとうございます。
  以下にコピーを作成しました。こちらで作業をすすめいてきます！
  
  共有フォルダ>BizDev>引き渡し用
  https://docs.google.com/spreadsheets/d/1q9wgtFSNHDaYwk8p6E0LkzQ0hPG4VJEW3765QSpfA1M/edit?usp=drivesdk
  -----
  ukishima: ありがとうございます。csvでエクスポートしたものを一括でAIに食わせるフローでいけるようにだけ準備しておきます。`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@719135943776534530> さっきはありがとう！！担当してくれた部分の説明めっちゃ良かったし分かりやすかった！
  今回ちょっと俺が部分で入っちゃったけど、そこも含め一人でカバーできるようになってもらえるとめちゃありがたい！！❤️‍🔥
  -----
  chaichai: 事前に準備しておくべきでした...
  すみません、マニュアルに導入部分まとめて整理しておきます！
  -----
  Uwaizumi｜🔗UnyteDAO Founder: お願いします！！`,
  `Tyche: <@710388387726753852> 
  来週5/31(水)のPANDAOさんとMETAKAWIIさんのスペースのリンクってまだ作ってなかったわよねー
  Unyteが立てたリンクいつまでにご連絡するとか話してましたっけ。
  AOさんのところでイベントスケジュールにすでに組み込まれていて、Cocoaさんのほうでも事前告知はスペースなどで少しずつはじめているのですが正式アナウンスは待ってる状態みたいで…
  
  スペースのリンク作って、シェアお願いしますわよー🙇
  -----
  Uwaizumi｜🔗UnyteDAO Founder: おおお承知しました！！リンクだけ作って後で告知ってできましたっけ。。？！
  -----
  Tyche: スペース立てたことないのでわからないですぅ…🙇
  昨日みたいになるのでRECの選択をお忘れなくわよ`,
  `chaichai: <@981932546298351688> 
  夜分遅くすみません🙇‍♂️
  フィードバック一覧で顧客のステータスを表示するよう対応しました！
  一番右にあります！
  https://www.notion.so/unyte/2c8578d8a59b479a925be85941f262b4?v=b15907af1b6944b0a21ba63144d7403f&pvs=4
  -----
  Tyche: これ、確認してみたんだけど使い方がちょっと心の目でも通じ合えなかった…
  急ぎではないので明日以降でもよいのだけど、どこかでVCで確認させて頂きたいですわよー🙇
  -----
  chaichai: フィードバック一覧に顧客のステータスが反映、見えるようにようにすると嬉しいとおっしゃっていたのでそちらの対応です...
  分かりづらくてすみません🙇‍♂️
  -----
  Tyche: 使ってみたら押し方（入力の選び方）がわからなかったデス…`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@719135943776534530> 資料作成お願いしたいんですが、今日話せる時間ある？
  -----
  chaichai: 10分ほどの内容共有であれば、13:00~16:30で可能です！
  
  実際の作業は夜遅くとなってしまいそうでして、
  19:30以降の予定がずらせる可能性があるので確認してみます。
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 内容共有、議事録読み込んで`,
  `Tyche: リード一覧のほうを使いこなしてないので詳細まで判断しかねるのですが、BacklogsのTOPページの上部の「期日が迫ってます」欄と「今後1週間」の欄に、中間連絡対応や最終連絡対応のタスクが上がってくるなら良いと思います。
  （いまは自分の個人ページの上部にしか出てこないみたい）
  -----
  chaichai: ありがとうございます！
  顧客DBにリードも入れてしまって、ステータスで管理する方が良いかもですね...`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@760809359646785566> ダッシュボード進捗ください
  -----
  yoshito: ちょっと離席するので、GitHubにあげました。
  https://github.com/UnyteDAO/Unyte-B2B-dashboard/pull/2
  -----
  Uwaizumi｜🔗UnyteDAO Founder: はい！結論22までにできそう？
  -----
  yoshito: いけそうです`,
  `Uwaizumi｜🔗UnyteDAO Founder: すみません開発で詰まってて見れてませんでした！
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
  よろしくお伝えくださいねー。親子丼さんらぶ🫶`,
  `chaichai: <@981932546298351688> 
  夜分遅くすみません。
  以下タスクに関して、導入済みのプロパティを設け、
  
  1. Bot導入が決まったらチェック
  2. リード一覧で表示しなくする
  3. 以降は顧客DBで管理する
  
  でも良いかなと思ったのですが、いかがでしょうか？
  
  https://www.notion.so/unyte/Backlog-c440c1b4229c46e28fcaa06724871ddf?pvs=4`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@981932546298351688> こちらありがとうございます！最高です！
  最高なので、DAO Founderロールの人はメンションしてしまっていいかもと思いました！
  https://discord.com/channels/1068105624103170079/1070185304100720670/1107892050390691851
  -----
  Tyche: スペースの日程が確定したら、あわせてアナウンスしてはどうかしら？
  -----
  Uwaizumi｜🔗UnyteDAO Founder: そうしましょうか！`,
  `Uwaizumi｜🔗UnyteDAO Founder: <@488544515976724480> 明日の定例で改めてご相談したいのですが、仮にライブラリを使わず実装し直した場合、
  
  ・現状の機能は変えず、バックエンドのライブラリのみ削除し実装
  ・上記に加え、チャンネルのログも読み込んで回答する機能も追加実装
  
  それぞれいつ頃までに実装できそうか教えていただけると嬉しいです！
  -----
  ukishima: 2点の機能としては合わせても 2人/日 ぐらいではいけると思いますが、チャンネル読み込みについてはいわゆるノイズが増えることになるので、返してほしいものを返さなくなるということが想定されます。回答精度の部分を度外視するのであれば、Backlogsで設定してある期日までには動くものにすることはできると思います。
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 承知しました！！
  懸念についてはおっしゃる通りかと思いますので、チームでどちらのバージョンについても一度触ってみて試した上で第一弾のテストにどちらを持って行くか決定しましょう。
  以前お話しいただいたチャンネルの情報圧縮があった上で、情報を消すという動作無しにどこまでの精度の回答がなされるかという点が最も重要と思料しています。過去ログのノイズデータを一つ一つ消す負担を強いるのは現実的ではないかなと…！`,
  `Uwaizumi｜🔗UnyteDAO Founder: @everyone  今日エキスポでVLCNPのファウラーさんにご挨拶できました！
  Unyteについて、「メンバーの活動を承認するときに、意外と地道に活動してくれている人がいたことを改めて認識できた。承認のフローがあることも含めてとても気に入っている」という旨のことを言っていただきました！
  めちゃありがたいですね！！！引き続き頑張っていいプロダクト作っていきましょう！`,
  `ukishima: <@710388387726753852> <@760809359646785566> <@719135943776534530> 
  進捗2Earnについての動きのスケジュール感や誰がいつまでに何を対応するという点は共通認識にいたっていますか？
  -----
  Uwaizumi｜🔗UnyteDAO Founder: こちらは<@760809359646785566> が担当で、来週末のデモデイに出場できるよう書類を作成してもらっています。期限が5/20であることが分かったので来週までには出せるよう双方で確認しながら動いています。`,
  `Uwaizumi｜🔗UnyteDAO Founder: 義人もダッシュボード開発してるし、、 <@719135943776534530> balanceコマンド周りの実装、どこかで相談させてもらっても良いでしょうか、、！
  -----
  chaichai: 承知です
  GW前にしますか？
  -----
  Uwaizumi｜🔗UnyteDAO Founder: ありがとう！！来週月曜か火曜でもいい？
  -----
  chaichai: 月曜午前、火曜は基本行けます！
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 月曜11時でお願いできますか！
  -----
  chaichai: 失礼しました！月曜午後です🙇`,
  `ukishima: <@710388387726753852>  が BGIN の定例総会中のラウンドテーブルにメインスピーカーの1人として登壇します。

  おそらくは国際舞台デビューだと思いますので、チームの皆さまにおかれましては、是非 無料オンライン参加の登録をお願いします。
  
  ※Taskとして振っていますので強制です🤪 
  
  登録手順は以下のBacklogを参照ください。
  
  https://www.notion.so/unyte/2055490d4815494cb76141b85138c366?pvs=4
  -----
  yoshito: かっこいい！！！！！！
  我らがCEO`,
  `Uwaizumi｜🔗UnyteDAO Founder: @everyone 木曜23時からでお願いします！こちらの事前検討内容に関して、各自ドキュメントにまとめて持ち込みをお願いします！
  https://www.notion.so/unyte/bae537f40e07480eb1cfb0171ca36a1e?pvs=4
  -----
  Tyche: どこに記載すれば良いか指示いただけると助かるわよー
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 事前課題欄作りました！大変恐縮ですが、こちらの要領で全員分の枠を作っていただけないでしょうか😂
  -----
  ukishima: それぞれに孫タスクを振らせて頂きました。
  お手数ですが各人のファイルに記入の上、完了ステータスへの変更をお願いします。
  期限は木曜23時までとさせていただいております。
  
  記入の位置やフォーマットは自由に書いていただいて結構です。
  @everyoneUwaizumi｜🔗UnyteDAO Founder: @everyone 木曜23時からでお願いします！こちらの事前検討内容に関して、各自ドキュメントにまとめて持ち込みをお願いします！
https://www.notion.so/unyte/bae537f40e07480eb1cfb0171ca36a1e?pvs=4
-----
Tyche: どこに記載すれば良いか指示いただけると助かるわよー
-----
Uwaizumi｜🔗UnyteDAO Founder: 事前課題欄作りました！大変恐縮ですが、こちらの要領で全員分の枠を作っていただけないでしょうか😂
-----
ukishima: それぞれに孫タスクを振らせて頂きました。
お手数ですが各人のファイルに記入の上、完了ステータスへの変更をお願いします。
期限は木曜23時までとさせていただいております。

記入の位置やフォーマットは自由に書いていただいて結構です。
@everyone`,
  `chaichai: <@710388387726753852> 
  明日マニュアルの件で30分ほどお時間いただきたいです！
  -----
  Uwaizumi｜🔗UnyteDAO Founder: あざす！！ぜひ！！オフライン行ける。。？
  -----
  chaichai: 健康診断を受けなければならないらしく、オンラインになりそうです…
  申し訳ありません
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 了解！
  -----
  chaichai: ありがとうございます！13:30~15:00以外は大丈夫です
  -----
  Uwaizumi｜🔗UnyteDAO Founder: 15時で！そこまでに叩き台完成させてもろて、今日中には出せる？
  -----
  chaichai: 何とか出したいです！
  サービス概要とDiscordBotの紹介については書けているので、お手隙の際にご確認いただきたいです🙇
  -----
  Uwaizumi｜🔗UnyteDAO Founder: あ、めっちゃ良い＠＠＠＠`,
  `Uwaizumi｜🔗UnyteDAO Founder: こちらでお話しする予定です！
  -----
  Tyche: リンクありがとうございます
  GoogleMeetの設定を見直したのですが、なぜか入れない場合がたまにあって…念のため招待コードも貰えますか？
  -----
  Uwaizumi｜🔗UnyteDAO Founder: ありがとうございます！
  招待コードは、リンクの末尾の3-4-3文字のアルファべットと同一です！
  -----
  Tyche: 承知しましたわよー`,
  `chaichai: 名刺の管理などはどのようにすることが一般的なのでしょうか...?
  （backlogのプロパティに先方の担当者なども記載できると良いのかなと思いました！もしくは他のツールを使った方が良いのでしょうか？）
  -----
  ukishima: 一般的な物理的に名刺を受け取った後の管理で言えば、カメラ撮影によるOCRが使えるツールを利用することが多いですよね。いちいち名前や住所、メールアドレスなどを打ち込むのがめんどくさいので。
  単純に限定された取引先担当者をもっておくという意味でいえば、案件ごとに取引先担当者を入力するといった感じで済ませることもありますね。
  取引先担当者テーブルを作成し使うということもあります。
  今回のパターンで言えば、バックログDBのプロパティに担当者をテキストで入力するのか、顧客DBのプロパティとしてもたせて、バックログDBにリレーション/ロールアップさせるかを判断するという形ですかね。
  -----
  chaichai: なるほど。勉強になります✍️
  -----
  ukishima: とりあえず、たたき台にはなっていると思うので、一旦 自分の手から離します。
  より使いやすいツールや方法があればそちらを検討するのは全然ありなので、 <@710388387726753852> <@760809359646785566> <@981932546298351688> さんと相談しながら、案件が管理しきれなくなる前に運用にのせることを検討してください。
  
  何かお手伝い/作業が必要なことがあればお声がけいただければと思います。`,
  `Tyche: 少し前から導入先をフォローアップしきれてないのが気になってたけど、いよいよボロが出始めてるのでCRM的な仕組み欲しい…
  -----
  Uwaizumi｜🔗UnyteDAO Founder: まさに仰る通りで、この辺り一般的にどのようにフォローされているかご存知でしょうか。個人的には単に担当者として分担してフォローするという仕組みしか無いような気がしているのですがCRMツールのようなものもあるんですかね
  -----
  Tyche: いまあーたの頭の中やギリギリあちしが追えてる導入先や見込み顧客の触感や課題、対応履歴などの情報を可視化していくとフレームワークが見えてきて、この先お取引先さまが増えていっても楽になると思うのわよ。
  かといって、スタートアップとして情報を蓄積するのに時間を取られる仕組みだと合わないと思うけどね。
  
  特に初期から使ってもらってるDAOさんには、ただbotを入れてもらうだけ、相談を投げかけてくれたら返答するだけに留まらず、顧客満足度やロイヤルティ上げて、口コミ効果も狙いたいわね
  -----
  Uwaizumi｜🔗UnyteDAO Founder: なるほど！！！
  取り急ぎ、notionに表作って私の見えてる範囲での使われ方と対応状況を書き下していきます！
  -----
  Tyche: ちょうど新規導入が決まってるところが何箇所かあるから、bot導入の案内から試用期間終わりまでの時系列やることリスト(MUSTだけではなく、フォローアップも含め)があると、チームで分業しやすいと思うわよ
  -----
  Uwaizumi｜🔗UnyteDAO Founder: たしかに！！ありがとうございます！`,
  `yoshito: <@719135943776534530> 
  お客さんにヘルプページのこと伝えてるので、誤認識をば
  https://discord.com/channels/1068105624103170079/1088642918564237322/1098450325364551841
  -----
  chaichai: ありがとうございます！
  来週火曜日までに雛形完成させる予定です
  -----
  yoshito: ありがとでごわす！
  -----
  chaichai: 鹿児島の思い出が思い出されました笑`,
  `Tyche: <@710388387726753852>  <@760809359646785566> <@719135943776534530>
  明日の夜(おそらく21時頃)メタカワDiscord内ボイチャにて、週末のTOKYO OTSUKA NFT FESの運営ボランティアで最終ミーティングを行う予定です。(未確定)
  なるべく、ご参加頂きますようお願いしますわよー
  ※確定次第、改めてアナウンスします
  -----
  Tyche: <@760809359646785566> <@719135943776534530> 
  イベント運営ボランティアミーティングですが【4/20(木) 21時〜22時】に行われることが確定しました。
  よろしくお願いします。
  
  場所はメタカワDiscord内のVCになりますので、まずはサーバーにご参加ください。
  また、現在ボイチャルームはホルダー限定となっていますので、お二人がサーバー参加後に管理者権限のある人にお願いしてロールの調整を行ってもらいます。
  サーバーに入り次第、早めにお知らせください。
  https://discord.gg/metakawaii
  -----
  yoshito: さーばー参加完了しました！
  -----
  Tyche: <@719135943776534530> 
  閲覧できるロール付与されたと思いますのでご確認ください
  
  イベントの話し合いをしているチャンネル↓
  https://discord.com/channels/905958004992655390/1083657995709321236
  
  今日のミーティング↓
  https://discord.com/channels/905958004992655390/977905552124411904
  -----
  chaichai: ありがとうございます！
  イベントの話し合いチャンネルはリンク踏めないカモです...
  -----
  Uwaizumi｜🔗UnyteDAO Founder: あ、多分スレッドをフォローしてないからかも。ちょっと待ってね。メンションするわ`,
];

const main = async () => {
  let timestamp = 1627776000000; // 初期のタイムスタンプ

  for (let i = 0; i < chatlogs.length; i++) {
    await createNewPage(
      {
        guild: { id: "1116959856763600936" },
        channel: { id: "1118546453837652159" },
        createdTimestamp: timestamp,
      },
      "1687192683882",
      chatlogs[i],
      []
    );
    timestamp += 86400000; // タイムスタンプを1日分増加
  }
};

// main();

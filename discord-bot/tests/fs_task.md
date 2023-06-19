# 目的

- Task については人の介在を不要にする

# バッドケース

-

# #1

## チャットログ

`ukishima: <@&1075250143584059472>  AI Botの接続先を、Azureのスタートアッププログラムを使った Azure OpenAIに変更し、接続、Embedding、質問送信、回答について基本的な動作を確認しました。 https://www.notion.so/unyte/Azure-AI-c53f9c18983c4283a117e31cf7f6427c?pvs=4`;

## Task 作成の際のプロンプト

const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれるTo do(日本語、箇条書き):`;

## 結果

summary:
ukishima さんは、AI Bot の接続先を Azure OpenAI に変更し、基本的な動作を確認したことを述べた。具体的には、接続、Embedding、質問送信、回答の動作を確認したとのこと。詳細については Notion に記載されている。
=====
task:

- Azure のスタートアッププログラムを使用して、AI Bot の接続先を Azure OpenAI に変更する。
- 基本的な動作の確認を含め、接続、Embedding、質問送信、回答について確認する。

## 採用可否

❌

# 2

## チャットログ

`"Tyche: <@710388387726753852> <@488544515976724480>
さっき Notion 内に Uwaizumi さんが作ってくれた「AI 活用ユーザーテスト」というシートなのですが、
Notion Home > リサーチ結果 > Research Repeat
というディレクトリの中に入っていて顧客 DB と紐づいてないため、個別の顧客の状況が把握しにくいです…
なんかいい方法ありますか？
(当方 notion1 年生のため、使い方がわかってないだけなら、教えて頂きたく…🙇)---
Uwaizumi ｜ 🔗UnyteDAO Founder: うちには天才がいます
Tyche: キャーーー素敵！！！
ありがとうございます 💗"`;

## Task 作成の際のプロンプト

const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれるTo do(日本語、箇条書き):`;

## 結果

summary:
Tyche は、Notion 内のシートについて Uwaizumi さんに尋ね、ディレクトリ内の顧客 DB と紐づけされていないため、顧客の状況を把握しにくいと述べました。Uwaizumi さんは、Notion1 年生である Tyche に教えてくれると言いました。Tyche は Uwaizumi さんに感謝します。
=====
task:

- 「AI 活用ユーザーテスト」というシートを見て、顧客 DB と紐づける方法を考える。
- # Notion の使い方について教えてもらう。

## 採用可否

⭕️

# 3

## チャットログ

`"Tyche: <@710388387726753852> <@488544515976724480>
さっき Notion 内に Uwaizumi さんが作ってくれた「AI 活用ユーザーテスト」というシートなのですが、
Notion Home > リサーチ結果 > Research Repeat
というディレクトリの中に入っていて顧客 DB と紐づいてないため、個別の顧客の状況が把握しにくいです…
なんかいい方法ありますか？
(当方 notion1 年生のため、使い方がわかってないだけなら、教えて頂きたく…🙇)---
Uwaizumi ｜ 🔗UnyteDAO Founder: うちには天才がいます
Tyche: キャーーー素敵！！！
ありがとうございます 💗"`;

## Task 作成の際のプロンプト

const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれるTo do(日本語、箇条書き、既に完了済みの内容は含めずに)：`;

## 結果

summary:
Tyche は Notion 内で作成された「AI 活用ユーザーテスト」というシートについて、顧客 DB と紐づいていないため、個別の顧客の状況が把握しにくいと述べる。Uwaizumi は、Notion Home > リサーチ結果 > Research Repeat というディレクトリの中にシートが入っていることを示し、顧客 DB と紐づける方法については不明である旨を伝える。Tyche は、Uwaizumi に感謝の意を表明する。

task:

- Notion Home > リサーチ結果 > Research Repeat のディレクトリの中のシート「AI 活用ユーザーテスト」を確認する。
- 顧客 DB と紐づける方法を探す。
- Notion の使い方について教えてもらう。

## 採用可否

⭕️

# 4

## チャットログ

`Uwaizumi｜🔗UnyteDAO Founder: @everyone Roopt DAOさんでも有料にて利用継続いただけることが決定しました！！
RooptさんはDAOらしく、Snapshotで決議いただきました。
そして有難いことに満場一致、かつ過去2番目の賛成数(15RPT)にて可決いただいております！！！感謝！！
https://snapshot.org/#/roopt.eth/proposal/0x6f7d6c71f3285c2223b6138a38ddca57d30d74f170f81adb549a91a76c5d70ca`

## プロンプト

const modelPromptSummary = `chatlog: ${rawText}\n\n{chatlog}の要約（仕様：日本語、誰が何を言ったか・実行したかを明確に）：`;
const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれるTo do(日本語、箇条書き、既に完了済みの内容は含めずに)：`;

## 結果

Uwaizumi さんが Roopt DAO において、有料利用の継続が決定されたことを伝えた。Snapshoot を使用して決議がされ、全員賛成の 15RPT で可決された。Uwaizumi さんは感謝の気持ちを示した。

- Roopt DAO が有料にて利用継続することが決定したことを伝える。
- Roopt DAO が Snapshot で決議し、可決された旨を報告する。
- 感謝の気持ちを伝える。
- Snapshot のリンクを共有する。

## 採用可否

微妙

# 5

## チャットログ

`Uwaizumi｜🔗UnyteDAO Founder: @everyone Roopt DAOさんでも有料にて利用継続いただけることが決定しました！！
RooptさんはDAOらしく、Snapshotで決議いただきました。
そして有難いことに満場一致、かつ過去2番目の賛成数(15RPT)にて可決いただいております！！！感謝！！
https://snapshot.org/#/roopt.eth/proposal/0x6f7d6c71f3285c2223b6138a38ddca57d30d74f170f81adb549a91a76c5d70ca`

## プロンプト

const modelPromptSummary = `chatlog: ${rawText}\n\n{chatlog}の要約（仕様：日本語、誰が何を言ったか・実行したかを明確に）：`;
const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれる「今後」行うTo do(仕様：日本語、箇条書き、既に完了済みの内容はTo doに含めずに)：`;

## 結果

Uwaizumi さんが UnyteDAO の創設者に向けて、Roopt DAO で有料利用の継続が決定されたことを伝えます。Roopt さんは DAO の形式を取り、Snapshot で決議が行われ、15RPT の賛成票により可決されました。Uwaizumi さんは感謝の意を表します。

このチャットログに含まれる「今後」行う To do はありません。すでに完了済みの内容が記載されています。

## 採用可否

⭕️？

# 6

## チャットログ

`"Tyche: <@710388387726753852> <@488544515976724480>
さっき Notion 内に Uwaizumi さんが作ってくれた「AI 活用ユーザーテスト」というシートなのですが、
Notion Home > リサーチ結果 > Research Repeat
というディレクトリの中に入っていて顧客 DB と紐づいてないため、個別の顧客の状況が把握しにくいです…
なんかいい方法ありますか？
(当方 notion1 年生のため、使い方がわかってないだけなら、教えて頂きたく…🙇)
Uwaizumi ｜ 🔗UnyteDAO Founder: うちには天才がいます
Tyche: キャーーー素敵！！！
ありがとうございます 💗"`;

## プロンプト

const modelPromptSummary = `chatlog: ${rawText}\n\n{chatlog}の要約（仕様：日本語、誰が何を言ったか・実行したかを明確に）：`;
const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれる「今後」行うTo do(仕様：日本語、箇条書き、既に完了済みの内容はTo doに含めずに)：`;

## 結果

Tyche が Notion の利用方法に関する質問をし、Uwaizumi が AI 活用ユーザーテストに関するシートを作ったことを伝えた。しかし、顧客 DB と紐づいておらず、個別の顧客の状況が把握しにくいという問題があった。Notion の使い方について教えてほしいと頼んだ。Uwaizumi は天才がいると言い、Tyche は素敵だと感謝の言葉を述べた。

- Notion の使い方を学ぶ
- 顧客 DB と紐付ける方法を調べる
- 「AI 活用ユーザーテスト」シートの改善案を考える

## 採用可否

⭕️？

# 7

## チャットログ

```
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
よろしくお伝えくださいねー。親子丼さんらぶ🫶`;
```

## プロンプト

const modelPromptSummary = `chatlog: ${rawText}\n\n{chatlog}の要約（仕様：日本語、誰が何を言ったか・実行したかを明確に）：`;
const modelPromptTask = `chatlog: ${rawText}\n\n{chatlog}に含まれる「今後」行うTo do(仕様：日本語、箇条書き、既に完了済みの内容はTo doに含めずに)：`;

## 結果

Uwaizumi は開発に詰まっていたため、Tyche が経理相談を依頼しました。Uwaizumi は会議と親子丼を予定していたため、18 時に会議後に話すことを提案しました。しかし、Tyche は明日以降も大丈夫と伝えました。後日、Uwaizumi は 17 時に話すことを提案し、Tyche は了承しました。Tyche は親子丼が好きなようでした。

- 経理相談のために Uwaizumi と会話すること
- Uwaizumi と明日 17 時ごろに再度会話すること

## 採用可否

⭕️？

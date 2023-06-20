# Taskal for AI Crypto Hackathon
**〜AIでチャットログからタスクを抽出、ブロックチェーンで「助け合い」を可視化〜**

## 各種リンク

Live demo: https://unytedao.github.io/AI-Crypto-Hackathon/ 

Discord Bot招待リンク： https://discord.com/api/oauth2/authorize?client_id=1118547611893370970&permissions=8&scope=bot

## テーマの背景

2023年は第4次AIブームの始まりともいえる年となり、人の指示や質問に応じて文章や画像などを作ることができるChatGPT等の生成AIは大きく技術的な発展を遂げています。

従来のチャットボットとは桁違いに流暢で自然な言葉で返答をしてくれ、与えられた文章の内容を分析し、要約や提案をすることができるAIが普及していくことにより、社会に大きなインパクトを与え、働き方や労働市場にパラダイムシフトをもたらすと考えられています。

また我々は、DAOにおいてAIを活用することで、真の意味で「Autonomous」な組織を作ることができるのではないかと考えています。

- ユーザーの活動を集約し、
- 貢献度を算出し
- 事前に決まった量のトークンを送付する

というフローをスマートコントラクトのみで記述するには、どうしても技術的な限界があります。

これを、AIを活用したテキストの解析により行うことで、属人性を排除しつつ全ての努力に報いられる世界を構築できるのではないでしょうか。

そして、上記のようなシステムにより実現される滑らかな組織こそ、本当の意味でDAOであると我々は考えています。

## 課題

### Why AI？

今回は上記の対話型AIを、「チャット履歴の要約」「会話ログから想定されるタスクの抽出」というユースケースに用いました。DAOをはじめとするコミュニティにおいて、自分がいなかった間の会話ログを全て追うのが難しく、結果コミュニティに参加しにくくなってしまうという課題に着目しました。会話のログをテーマごとに要約して表示するという作業は、人力ではかなりの時間と手間がかかります。ここにAIを活用することで、コミュニティにおける「メンバーの参加率向上」を実現します。また、AIを活用し要約データからコミュニティとして取るべきアクションを出力するという機能も実装しました。これによりコミュニティメンバーは情報のキャッチアップに加え、自身にできる作業の発見と参加の意思表示もできるようになっています。

組織やチームの現状を素早くキャッチアップできるソリューションを提供することは、コロナ禍以降の働き方の多様化により副業や兼業が増加し、所属組織が多くなったことで情報過多となった人々の一助となり、組織内で協力し合えるゆとりをもたらすものと考えます。また、手っ取り早くコミュニティの情報をキャッチアップし、貢献できる状態を実現することでタイパを重視するZ世代にとっても参加しやすいコミュニティとなるはずです。

### Why Crypto?

また、今回のプロダクトではチャットログの要約とタスクの抽出に加え、タスク実行＝貢献履歴の可視化を行う機能も追加しました。メンバーがタスクを担当する意思表示をした段階、実際にタスクをこなして成果物を提出した段階のそれぞれにおいて、該当するメンバーにタスクの情報を記録したNFTを発行します。これにより、「誰が」「どのコミュニティで」「どんな貢献をしたか」というデータを、ブロックチェーンというパブリックかつ改ざん不可能な場所に保存することができ、誰もが自身の貢献履歴を簡単に証明できるようになっています。我々は「経歴の証明」がブロックチェーンの主たるユースケースになると確信しており、今回のアウトプットはブロックチェーンを社会実装するための1つの解を示しているものと考えます。

## 概要動画

（動画サムネが入ります）

## プロダクト概要

DAOやコミュニティにおけるチャットログは膨大で、全てをキャッチアップすることは不可能です。

DAOに貢献したいと考えていても

- 本業や子育ての合間に時間を取り、
- 膨大なチャットログを読み込んで自分がやるべきことを見つけ
- 成果物を作って貢献する

という作業をこなすことができず、結果ますます参加しにくくなってしまうという状況が発生しています。DAOにとっても、貢献してほしいと思っているもののどんなタスクを誰に渡せば良いか分からず、結果運営メンバーのみでなんとか仕事を回している、ということも少なくありません。

私たちはコミュニティにおけるチャット履歴を要約し、タスクを抽出できる「Taskal」を開発しました。
![test11](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/f47cab05-fa66-4da4-abcf-a94dd9966268)
## ⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬
![Screenshot 2023-06-20 at 1 24 49](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/bbbd7238-4353-432a-90c5-9c6b691a63ff)
Discord上で稼働するBotをサーバーに招待することで、テキストログが解析され会話内容ごとに自動で要約が生成されます。要約にはgpt-3.5を利用しています。
![Taskalフロント](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/1ee3b525-b68e-43bd-9427-5905d8fd67bc)

要約データはTaskalのwebサイト上で閲覧可能です。
また、要約データごとにチームとして取り組むべきタスクが自動で生成されます。
![タスクの属性判定](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/c52b060f-1e97-4af1-b33e-a018b65adf30)
タスクの属性もAIで判定しており、自分が担当したい分野のタスクを簡単に探すことが可能です。
![トークンゲート編集後](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/26f04228-2ba3-4520-9dbc-403e58d7f822)

要約一覧ページの閲覧権限をコミュニティごとに制御することもできます。ウォレット接続時に特定のトークンを持っているかどうかを判定し、あるトークンを持っていれば自分たちのコミュニティのページを閲覧可能にする、という制限が可能です。
![test8](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/6de4ac22-0b21-4da1-a813-68826053e41c)
ユーザーはログイン後、好きなタスクを選んで「やります！」という意思表示ができます。
![タスク担当チェック](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/80e3d7a2-ef1e-42b7-abfd-569eedf7d05d)

タスク完了時には、サーバー管理者から該当するユーザーにお礼を送ることができ、「タスク実行の意思表示」「実行完了」それぞれのアクションが記録された際、自動でNFTを発行する機能を備えています。
![ありがとう！](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/7f29f16c-8fc6-4dad-985b-b49c268179d4)
![お願い！](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/42a96773-1daf-409a-a845-cfc7f29923cf)
これにより、どのユーザーがどんなコミュニティでどれくらい貢献してきたのかというデータをブロックチェーン上に保存することができ、ユーザーの経歴も簡単に証明することが可能になります。

## 概要動画

https://youtu.be/V6bapKpFG_4

## アーキテクチャー

![test drawio](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/c991638c-d4a4-4acc-b3c5-b22250f74946)

!https://github.com/ukishima/EOA-Crypt-For-Tokyo-Web3-Hackathon/raw/main/docs/overview/pic_architecture.jpg

## Tech Stacks

| Category | Name |
| --- | --- |
| Protocol | Astar Network |
| Infrastructure | openAI(chatGPT3.5turbo)、AWS、Notion |
| Language | Html、Javascript、React、TailwindCSS、Vite、Solidity |
| Web2-Web3 Bridge | ethers.js、wagmi |

## Blockchain

Astar Network

## repository

https://github.com/UnyteDAO/AI-Crypto-Hackathon

## contract

[Subscan | Aggregate Substrate ecological network high-precision Web3 explorer](https://astar.subscan.io/account/0x2388491c52f05979ecdd5a4b0361a7be9c4f7334)

## Product Page（demo）

- β版リンク
    
    [Taskal](https://unytedao.github.io/AI-Crypto-Hackathon/)
    
- タスク完了時に発行されるNFTの例
    
    [Bluez](https://bluez.app/asset_detail?id=648d98a0d2e6b44ac93824cb)
    
    ![image](https://github.com/UnyteDAO/AI-Crypto-Hackathon/assets/40339533/9a153933-5dcd-4162-8413-d9a6f45cf0f5)

  

## Pitch Slide Page
https://docs.google.com/presentation/d/1vMPAK55h5T4BDjJAiGHF7Y96Ua9umWu9jwQdR2S19-c/edit?usp=sharing


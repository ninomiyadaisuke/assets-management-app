# 株式管理アプリケーション

## 目的
このアプリケーションは、ユーザーが自身が保有している株式を記録・管理するためのものです。

## 使用技術
- **Frontend/Backend**: Next.js
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: Supabase Auth
- **Data Source**: Google Spreadsheets
- **Cloud Functions**: GCP Cloud Functions
- **Task Scheduling**: Cloud Scheduler
- **Messaging**: Pub/Sub
- **Real-time Communication**: WebSocket

## データベース設計

### 主要テーブル
- User（ユーザー）
- Account（口座）
- Stock（株）
- Holding（保有株）
- Message（メッセージ）
- UserMessage（ユーザーメッセージ）

#### User（ユーザー）テーブル
- userId: ユーザーID
- email: メールアドレス
- createdAt: 作成日
- updatedAt: 更新日
- accounts: 口座関連
- holdings: 保有株関連
- UserMessage: ユーザーメッセージ関連

#### Account（口座）テーブル
- accountId: 口座ID
- accountType: 口座タイプ (特定口座 or 新NISA)
- createdAt: 作成日
- updatedAt: 更新日
- userId: ユーザーID
- holdings: 保有株関連

#### Stock（株）テーブル
- stockId: 株ID
- stockName: 株名
- stockCode: 株式コード
- currentStockPrice: 現在の株価
- dividend: 配当金
- marketType: 市場タイプ (日本株 or 外国株)
- industry: 業種 (null可能)
- createdAt: 作成日
- updatedAt: 更新日
- holdings: 保有株関連

#### Holding（保有株）テーブル
- holdingId: 保有株ID
- numberOfSharesHeld: 保有株数
- acquisitionPrice: 取得価格
- acquisitionPriceJPY: 取得価格 (JPY)
- createdAt: 作成日
- updatedAt: 更新日
- userId: ユーザーID
- accountId: 口座ID
- stockId: 株ID

#### Message（メッセージ）テーブル
- messageId: メッセージID
- content: メッセージ内容
- createdAt: 作成日
- userMessages: ユーザーメッセージ関連

#### UserMessage（ユーザーメッセージ）テーブル
- userMessageId: ユーザーメッセージID
- userId: ユーザーID
- messageId: メッセージID
- isRead: 読まれたかどうか
- readAt: メッセージ読了日時 (未読の場合はnull)

## その他の情報
- 最新の株価、株式コード、配当金などの情報はGoogleスプレッドシートに保存され、Next.jsのAPIルートを通じて取得されます。
- スプレッドシートは毎日スクリプトにより更新され、最新の株価をGoogle Financeからスクレイピングします。
- GCPのCloud FunctionsとCloud Schedulerを利用して、毎日の株価を自動的にDBに反映する定期タスクを実行しています。
- WebSocketを導入しており、リアルタイムのデータ更新と表示をサポートしています。これにより、ユーザーは最新の情報を即座に受け取ることができます。
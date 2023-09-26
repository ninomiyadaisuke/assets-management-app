# 株式管理アプリケーション

## 目的
このアプリケーションは、ユーザーが自身が保有している株式を記録・管理するためのものです。

## 使用技術

| カテゴリ               | 技術                     |
|----------------------|-------------------------|
| Frontend/Backend     | Next.js                 |
| Database             | Supabase (PostgreSQL)   |
| ORM                  | Prisma                  |
| Validation           | Zod                     |
| Authentication       | Supabase Auth           |
| Data Source          | Google Spreadsheets     |
| Cloud Functions      | GCP Cloud Functions     |
| Task Scheduling      | Cloud Scheduler         |
| Messaging            | Pub/Sub                 |
| Real-time Communication | WebSocket           |

## データベース設計

### 主要テーブル
| テーブル名             | 主要フィールド                                               |
|----------------------|-----------------------------------------------------------|
| User（ユーザー）       | userId, email, createdAt, updatedAt                      |
| Account（口座）        | accountId, accountType, createdAt, updatedAt, userId      |
| Stock（株）           | stockId, stockName, stockCode, currentStockPrice, dividend |
| Holding（保有株）      | holdingId, numberOfSharesHeld, acquisitionPrice          |
| Message（メッセージ）  | messageId, content                                       |
| UserMessage（ユーザーメッセージ）| userMessageId, userId, messageId, isRead        |

### データベースのリレーションシップ

| テーブルペア                                       | リレーションシップ          |
|--------------------------------------------------|---------------------------|
| UserテーブルとAccountテーブル                      | One-to-Many関係           |
| UserテーブルとHoldingテーブル                      | One-to-Many関係           |
| AccountテーブルとHoldingテーブル                   | One-to-Many関係           |
| StockテーブルとHoldingテーブル                     | One-to-Many関係           |
| MessageテーブルとUserMessageテーブル               | One-to-Many関係           |
| UserテーブルとUserMessageテーブル                  | One-to-Many関係           |


## その他の情報
- 最新の株価、株式コード、配当金などの情報はGoogleスプレッドシートに保存され、Next.jsのAPIルートを通じて取得されます。
- スプレッドシートは毎日スクリプトにより更新され、最新の株価をGoogle Financeからスクレイピングします。
- GCPのCloud FunctionsとCloud Schedulerを利用して、毎日の株価を自動的にDBに反映する定期タスクを実行しています。
- WebSocketを導入しており、リアルタイムのデータ更新と表示をサポートしています。これにより、ユーザーは最新の情報を即座に受け取ることができます。

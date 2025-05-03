# 技術コンテキスト

## 使用技術

### バックエンド
- **言語**: Node.js, TypeScript
- **フレームワーク**: Hono
- **サーバー**: @hono/node-server
- **データベース**: MySQL
- **認証**: bcrypt, hono-sessions
- **その他ライブラリ**:
  - mysql2: MySQLクライアント
  - OpenTelemetry: アプリケーション計装

### フロントエンド
- **言語**: HTML, CSS, JavaScript
- **静的ファイル配信**: Nginx

### インフラ
- **コンテナ化**: Docker, Docker Compose
- **DNS**: PowerDNS
- **Webサーバー**: Nginx

### 開発ツール
- **コード品質**: ESLint, Prettier
- **ビルド**: TypeScript Compiler (tsc)

### パフォーマンス分析ツール
- **alp**: Nginxアクセスログ解析
- **mysqlslowdump**: MySQLスロークエリ解析
- **pprof/fgprof**: Goアプリケーションプロファイリング（サンプルアプリ用）
- **kataribe**: Webサーバーログ解析
- **pt-query-digest**: MySQLクエリ分析

## 開発環境セットアップ

### 前提条件
- Docker, Docker Composeがインストールされていること
- 本番環境へのSSHアクセスが可能であること

### 初期セットアップ手順
1. リポジトリをクローン
2. `make build`を実行してDockerイメージをビルド
3. `./hosts/hosts.txt`に本番環境の接続情報を記述
4. 本番環境からアプリケーションコードと設定ファイルを取得
5. `./ping-scripts.sh`で疎通確認

### 開発ワークフロー
1. アプリケーションコードの修正
2. `npm run build`でTypeScriptコードをコンパイル
3. `npm run start`でアプリケーションを起動
4. 必要に応じてデータベース初期化（`../sql/init.sh`）
5. ベンチマーク実行と結果分析
6. 最適化の実装

## デプロイプロセス

### デプロイ準備
1. アプリケーションコードの修正
2. ビルド
3. 設定ファイルの調整

### デプロイ実行
1. `deploy/deloy.sh`を使用してアプリケーションをデプロイ
2. `deploy/sync-settings.sh`で設定ファイルを同期
3. 必要に応じてサービスを再起動

### ベンチマーク実行
1. `bench/before-bench.sh`でベンチマーク前の準備
2. ベンチマークツールの実行
3. `bench/after-bench.sh`でログ収集と分析

## 技術的制約

### ISUCONルール関連
- 外部サービスの利用制限
- 特定のディレクトリ・ファイルのみ変更可能
- 指定されたポート番号・プロトコルの使用

### リソース制約
- CPU、メモリ、ディスク容量の制限
- ネットワーク帯域幅の制限

### セキュリティ制約
- SSH公開鍵認証の使用
- sudo権限の適切な管理
- ログディレクトリへのアクセス権限

## 監視・ロギング

### ログ収集
- Nginxアクセスログ
- MySQLスロークエリログ
- アプリケーションログ

### パフォーマンスモニタリング
- alpによるエンドポイント別レスポンスタイム分析
- mysqlslowdumpによるスロークエリ分析
- pprofによるCPUプロファイリング

### 分析手法
- ホットスポット特定
- ボトルネック分析
- リソース使用率監視

## 依存関係管理

### Node.js依存関係
- package.jsonによる管理
- npm/yarnによるインストール
- バージョン固定による安定性確保

### システム依存関係
- Dockerfileによる環境構築
- 必要なシステムパッケージの明示

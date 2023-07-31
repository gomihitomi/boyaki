# boyaki
吾味人美のぼやきです

## 開発の始め方

1. 下記を準備
    * WSL(Windowsの場合のみ) 
    * Docker
    * VSCode
        * `Dev Containers`
    * microCMSのドメインとAPIキー

2. gitからリポジトリを`clone`してVSCodeで開く
    * WSLの場合は`Ctrl + Shift + P`から`WSLで接続`を選んでからcloneしたフォルダを開く

3. `Ctrl + Shift + P`から`コンテナで再度開く`を選択

4. 依存関係を解決
    ```bash
    $ npm install
    ```

5. `packages/frontend/`に`.env.local`ファイルを作成
    ```bash
    $ touch packages/frontend/.env.local
    ```

6. microCMSの`ドメイン`と`APIキー`を設定して保存
    ```bash
    $ code packages/frontend/.env.local
    ```
    ```
    # microCMS
    MICROCMS_SERVICE_DOMAIN=domain
    MICROCMS_API_KEY=apikey
    ```
### フロントエンド

1. `packages/frontend`に移動
    ```bash
    $ cd packages/frontend
    ```

2. 下記コマンドで実行
    ```bash
    # 開発用
    $ npm run dev

    # 本番テスト用(ビルド + serve)
    $ npm run start
    ```

3. [http://localhost:3000](http://localhost:3000)を開く

### バックエンド

1. `packages/frontend`に移動
    ```bash
    $ cd packages/backend
    ```

2. 下記コマンドで実行
    ```bash
    # 開発用
    $ npm run start

    # 開発用（ファイル更新監視）
    $ npm run start:dev

    # 本番用
    $ npm run start:prod
    ```

    ```bash
    # 単体テスト
    $ npm run test

    # E2Eテスト
    $ npm run test:e2e

    # テストカバレッジ
    $ npm run test:cov
    ```

3. [http://localhost:3001](http://localhost:3001)を開く

## microCMS
* TODO: 気が向いたら書く

## Cyclic
* TODO: 気が向いたら書く
    ```
    Root Path: /packages/backend
    Output Path: packages/backend/dist
    ```

## その他
* nodeがポート掴んだままエラー落ちした時
    ```bash
    $ lsof -i:3001

    # 例
    COMMAND   PID USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
    node    10613 node   21u  IPv6 18596638      0t0  TCP *:3001 (LISTEN)

    $ kill 10613
    ```
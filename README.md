# boyaki
吾味人美のぼやきです

## 開発の始め方

1. 下記準備
    * WSL(Windowsの場合のみ) 
    * Docker
    * VSCode
        * `Dev Containers`
    * microCMSのドメインとAPIキー

2. gitからリポジトリを`clone`してVSCodeで開く
    * WSLの場合は`Ctrl + Shift + P`から`WSLで接続`を選んでからcloneしたフォルダを開く

3. `Ctrl + Shift + P`から`コンテナで再度開く`を選択

4. `/packages/frontend`に移動して`.env.local`ファイルを作成。microCMSの`ドメイン`と`APIキー`を設定して保存
    ```
    # .env.local
    MICROCMS_SERVICE_DOMAIN=domain
    MICROCMS_API_KEY=apikey
    ```

5. 下記を実行
    ```bash
    # 初回だけ必要
    npm install

    npm run dev
    ```

6. [http://localhost:3000](http://localhost:3000)を開く

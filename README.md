# boyaki
吾味人美のぼやきです

## 開発の仕方

1. 下記をインストール
* WSL(Windowsの場合のみ)
* VSCode
  * DevContainer

2. gitからリポジトリを`clone`してVSCodeで開く
* WSLの場合は`Ctrl + Shift + P`から`WSLで接続`を選んでからcloneしたフォルダを開く

3. `Ctrl + Shift + P`から`コンテナで再度開く`を選択

4. コンテナで開いたら下記を実行

5. `.env.local`に、`ドメイン`と`APIキー`を設定して保存

```bash
# 初回だけ必要な気がする
npm install

npm run dev
```

6. [http://localhost:3000](http://localhost:3000)を開いてぼやきが起動していることを確認

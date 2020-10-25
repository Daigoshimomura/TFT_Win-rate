# TFT_Win-rate

Riot Games が開発した「Teamfight Tactics」set3 の勝率をモード別に表示する、Web アプリケーションです。

## 概要

勝率をまとめたサイトは他にもありますが、モード別の勝率を見ることができるものが存在しないため、このサービスを制作しました。
しかしながら、制作開始時に使用していた公開 API のバージョンがアップデートし、破壊的変更が加わったことから、現在は直接 API に接続することができません。
そのため、現在は json-server を用いてモックサーバーを用意しています。アプリケーションと合わせて起動することで、当時の動作を確認することが可能です。

![TFT](https://user-images.githubusercontent.com/45229619/97107889-3cfa9180-170d-11eb-9e67-0357e6d5d8a5.png)

## 起動方法

1. 下記のコマンドをそれぞれ別のターミナルで実行する。

```javascript
  yarn mock3001
```

```
  yarn mock3002
```

2. また別のターミナルを起動し、下記のコマンドを実行する。

```
  yarn dev
```

3. [http://localhost:8000]()にアクセスする。

## 主要使用技術

- TypeScript
- React.js
- css-modules
- RiotAPI

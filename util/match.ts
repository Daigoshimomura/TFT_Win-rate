//matchdataを整理した型

export type matchData = {
  //ギャラクシーモード
  galaxiesmode: string;
  //プレイヤーごとのデータ
  playerDtoList: playerDto[];
};

export type playerDto = {
  //発動している特性
  traiDtoList: traitDto[];
  //ユニットリスト
  unitList: unitDto[];
  //順位
  rank: string;
};

export type traitDto = {
  //特性名
  name: string;
  //特性のユニット数
  num_units: number;
  //発動している特性のランク
  tier_current: number;
  //type
  type: string;
};

export type unitDto = {
  //チャンピオン名
  champion: string;
  //チャンピオンのコスト
  rarity: number;
  //チャンピオンの重なり具合
  tier: number;
};

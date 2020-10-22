//matchdataを整理した型

export type MatchData = {
  //ギャラクシーモード
  galaxiesmode: string;
  //プレイヤーごとのデータ
  playerDtoList: PlayerDto[];
};

export type PlayerDto = {
  //発動している特性
  traiDtoList: TraitDto[];
  //ユニットリスト
  unitList: UnitDto[];
  //順位
  rank: number;
  //チーム名
  teamName: string;
};

export type TraitDto = {
  //特性名
  name: string;
  //特性のユニット数
  numUnits: number;
  //発動している特性のランク
  tierCurrent: number;
  //type
  type: string;
};

export type UnitDto = {
  //チャンピオン名
  champion: string;
  //チャンピオンのコスト
  rarity: number;
  //チャンピオンの重なり具合
  tier: number;
};

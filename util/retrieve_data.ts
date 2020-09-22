//整理した後のデータを入れる箱

export type retrieve_data = {
  //ギャラクシーモード
  galaxiesmode?: string;
  //単体データ
  single_retrieve?: single_retrieve[];
};

export type single_retrieve = {
  //チーム名
  team_name?: string;
  //戦績データ
  record_data?: record_data[];
};

export type record_data = {
  //発動している特性
  traitList?: string[];
  //チャンピオン名
  champion?: string[];
  //勝率1位
  first_place?: number;
  //勝率4位以上
  four_rank_or_more?: number;
};

//入れる前の整理データ
export type singledata = {
  //発動している特性
  traitList?: string[];
  //チャンピオン名
  championList?: string[];
  //勝率1位カウント
  first_count?: number;
  //勝率4位以上カウント
  four_rank_or_more_count?: number;
};

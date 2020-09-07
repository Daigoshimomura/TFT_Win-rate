//整理した後のデータを入れる箱

export type retrieve_data = {
  //ギャラクシーモード
  galaxiesmode?: string;
  //チーム名
  team_name?: string;
  //チームカウント
  team_count?: number;
  //単体データ
  single_retrieve?: single_retrieve[];
};

export type single_retrieve = {
  //発動している特性
  traitList?: string[];
  //チャンピオン名
  champion?: string[];
  //勝率1位
  first_place?: number;
  //勝率4位以上
  four_rank_or_more?: number;
};

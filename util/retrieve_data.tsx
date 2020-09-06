import Reack from 'react';

//整理した後のデータを入れる箱

type retrieve_data = {
  //ギャラクシーモード
  galaxiesmode?: string;
  //チーム名
  team_name?: string;
  //発動している特性
  traitList?: string[];
  //チャンピオン名
  champion?: string[];
  //勝率1位
  first_place?: number;
  //勝率4位以上
  four_rank_or_more?: number;
};

export default retrieve_data;

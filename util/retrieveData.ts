//整理した後のデータを入れる箱

export type RetrieveData = {
  //ギャラクシーモード
  galaxiesmode?: string;
  //単体データ
  singleRetrieve?: SingleRetrieve[];
};

export type SingleRetrieve = {
  //チーム名
  teamName?: string;
  //発動している特性
  traitList?: string[];
  //チャンピオン名
  champion?: string[];
  //試合数
  totalCount: number;
  //勝率1位
  firstPlace: number;
  //勝率4位以上
  fourRankOrMore: number;
  //勝率5位以下
  fiveRankLessThan: number;
};

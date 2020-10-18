import { RetrieveData, SingleRetrieve } from '../util/retrieveData';
import { MatchData, PlayerDto, TraitDto, UnitDto } from '../util/match';
import modedate from '../public/json/galaxies.json';
import traitsdata from '../public/json/traits.json';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

//apiをコールしてギャラクシーのデータを返すクラス

//riotapikey
const api_key = 'RGAPI-e739821b-afeb-4be9-842c-565134eafc4b';
//特性種類
const typeOrigin: string = 'origin';
//特性種類
const typeClass: string = 'class';

const retrieve_galaxies = async (paths: string) => {
  const puuidList: string[] = await callSummoners();

  const matchidList: string[] = await callMatchid(puuidList);
  //TODO テスト用
  console.log(matchidList);

  //取得するモードを判別する
  const mode = fetchMode(paths);

  const matchDataList = await callData(matchidList, mode);

  //取得してきたデータを整理
  //チーム名を検索して処理を分ける
  const singleRetrieveList: Map<string, SingleRetrieve> = new Map();

  //勝率 TODO
  matchDataList.forEach((matchData) => {
    // 要素に対してアクションした結果を返せる＝返り値の型を変えられる
    matchData.playerDtoList.map((playerDto) => {
      const rateByTeam = singleRetrieveList.get(playerDto.teamName);
      // 存在しないチームなら、チームを作成する
      if (!rateByTeam) {
        singleRetrieveList.set(playerDto.teamName, {
          traitList: playerDto.traiDtoList.map((trait) => trait.name),
          champion: playerDto.unitList.map((unit) => unit.champion),
          totalCount: 1,
          firstPlace: playerDto.rank === 1 ? 1 : 0,
          fourRankOrMore: playerDto.rank !== 1 && playerDto.rank <= 4 ? 1 : 0,
          fiveRankLessThan: playerDto.rank >= 5 ? 1 : 0,
        });
        // 初めて作成したチームなので、これで初期データは作成完了。いったん終了する。
        return;
      }
      // すでにデータがあった場合、勝率を編集する
      if (playerDto.rank === 1) {
        rateByTeam.firstPlace++;
      } else if (playerDto.rank <= 4) {
        rateByTeam.fourRankOrMore++;
      } else {
        rateByTeam.fiveRankLessThan++;
      }
      rateByTeam.totalCount++;
    });
  });
  //勝率に変換し出力用に格納
  const output: SingleRetrieve[] = [];
  singleRetrieveList.forEach((singleRetrieve) => {
    singleRetrieve.firstPlace =
      singleRetrieve.firstPlace / singleRetrieve.totalCount;
    singleRetrieve.fourRankOrMore =
      singleRetrieve.fourRankOrMore / singleRetrieve.totalCount;
    singleRetrieve.fiveRankLessThan =
      singleRetrieve.fiveRankLessThan / singleRetrieve.totalCount;
    output.push(singleRetrieve);
  });

  const RetrieveData: RetrieveData = {
    galaxiesmode: paths,
    singleRetrieve: output,
  };

  return RetrieveData;
};

//summonerのpuuidを返す
const callSummoners = async () => {
  //challengerのサモナーデータURL
  const url = `${process.env.BASE_API_HOSTNAME}league/v1/challenger`;
  //apiからデータ取得
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  const summoners = await res.json();
  //TODO テスト用
  console.log(summoners);
  const summonerList = [];
  // 今回は1回分、回すようにする。
  // for (var i = 0; i < 5; i++) {
  const summonerName: string = summoners[0].entries.summonerName;
  const puuid = await callPuuid(summonerName);
  await summonerList.push(puuid);
  //TODO テスト用
  console.log(summonerList);
  // }

  return summonerList;
};

//puuidを取得
const callPuuid = async (summonerName: string) => {
  summonerName = encodeURI(summonerName);
  console.log(summonerName);
  const url = `${process.env.BASE_API_HOSTNAME}summoner/v1/summoners/by-name/${summonerName}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  const json = await res.json();

  const puuid = json[0].puuid;

  return puuid;
};

const callMatchid = async (puuidList: string[]) => {
  const matchidList: string[] = [];
  //puuidList分ループする。
  for (const puuid of puuidList) {
    const url = `${process.env.BASE_API_HOSTASIANAME}match/v1/matches/by-puuid/${puuid}/ids?count=20`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Riot-Token': api_key,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    const json: string[] = await res.json();
    if (matchidList.length === 0) {
      for (const data of json) {
        matchidList.push(data);
      }
    } else if (json != undefined) {
      //同じmatchidを追加しないようにしている。
      const jsonList: string[] = json.filter(function (element) {
        for (var i = 0; i < matchidList.length; i++) {
          if (matchidList[i] === element) {
            return false;
          }
        }
        return element;
      });

      for (const i in jsonList) {
        matchidList.push(jsonList[i]);
      }
    }
  }
  return matchidList;
};

//data取得
const callData = async (matchidList: string[], mode: string) => {
  const matchDataList: MatchData[] = [];
  const playerDtoList: PlayerDto[] = [];
  //マッチデータを取得
  // for (let i = 0; i < 1; i++) {
  const matchid: string = matchidList[0];
  const url = `${process.env.BASE_API_HOSTASIANAME}match/v1/matches/${matchid}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  const json = await res.json();
  console.log(`callData=${json[0].info.game_variation}`);
  console.log(`mode=${mode}`);
  //ギャラクシーモードを判定してそのjsondataのみ入れる。
  if (json[0].info.game_variation === mode) {
    for (const participants of json[0].info.participants) {
      const traiDtoList: TraitDto[] = [];
      //特性を取得しtraiDtoListに格納する。
      for (const traitdata of participants.traits) {
        const type = () => {
          for (const traits of traitsdata) {
            if (traits.key == traitdata.name) return traits.type;
          }
          return 'タイプが存在しない';
        };
        const traitDto: TraitDto = {
          name: traitdata.name,
          num_units: traitdata.num_units,
          tier_current: traitdata.tier_current,
          type: type(),
        };
        traiDtoList.push(traitDto);
      }

      //チャンピオンを取得しunitsDtoListに格納する。
      const unitsDtoList: UnitDto[] = [];
      for (const unitdata of participants.units) {
        const unitDto: UnitDto = {
          champion: unitdata.character_id,
          rarity: unitdata.rarity,
          tier: unitdata.tier,
        };
        unitsDtoList.push(unitDto);
      }
      //発動している特性ランクかつユニット数の大きい順に並べ替える
      traiDtoList.sort(function (a, b) {
        if (a.tier_current > b.tier_current) return -1;
        if (a.tier_current > b.tier_current) return 1;
        if (a.num_units > b.num_units) return -1;
        if (a.num_units < b.num_units) return 1;
        return 0;
      });
      //チャンピオンをレアリティ順に並び替え
      unitsDtoList.sort(function (a, b) {
        if (a.rarity > b.rarity) return -1;
        if (a.rarity > b.rarity) return 1;
        return 0;
      });

      //チーム名
      const team_name: string = teamName(traiDtoList);
      const playerDto: PlayerDto = {
        traiDtoList: traiDtoList,
        unitList: unitsDtoList,
        rank: participants.placement,
        teamName: team_name,
      };

      playerDtoList.push(playerDto);
    }

    const matchData: MatchData = {
      galaxiesmode: json[0].info.game_variation,
      playerDtoList: playerDtoList,
    };
    console.log(`matchData=${matchData}`);
    matchDataList.push(matchData);
  }
  // }
  console.log(`matchDataList=${matchDataList}`);
  return matchDataList;
};

//モード判別
const fetchMode = (paths: string) => {
  for (const galaxies of modedate.galaxies) {
    if (galaxies.janame === paths) return galaxies.key;
  }
  return 'TFT3_GameVariation_None';
};

//チーム名を決める
const teamName = (traiDtoList: TraitDto[]) => {
  const team_name: string =
    single_name(traiDtoList, typeOrigin) + single_name(traiDtoList, typeClass);
  return team_name;
};

const single_name = (traiDtoList: TraitDto[], type: string) => {
  for (const traiDto of traiDtoList) {
    if (traiDto.type === type) {
      return traiDto.name;
    }
  }
  //もしかしたらOrigin,classどちらかの特性だけのチームのときには空文字を返す
  return '';
};

export default retrieve_galaxies;

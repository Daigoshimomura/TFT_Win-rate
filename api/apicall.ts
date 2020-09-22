import {
  retrieve_data,
  single_retrieve,
  record_data,
  singledata,
} from '../util/retrieve_data';
import { matchData, playerDto, traitDto, unitDto } from '../util/match';
import championdata from '../public/json/champions.json';
import galaxiesdata from '../public/json/galaxies.json';
import traitsdata from '../public/json/traits.json';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

//apiをコールしてギャラクシーのデータを返すクラス

//riotapikey
const api_key = 'RGAPI-41603604-4995-41d7-af4b-bfb798b2c5bb';
//マッチカウント数
let matchcount: number = 0;
//1位カウント数
let firstcount: number = 0;
//4位以上カウント数
let fourcount: number = 0;

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
  const single_retrieve: single_retrieve = {};
  for (const matchData of matchDataList) {
    const team_name = teamName(matchData);

    const singledata: singledata = kindSingledata(matchData);
  }

  //勝率

  //TODOデータ整理後変更List
  const data: retrieve_data = {};
  return data;
};

//summonerのpuuidを返す
//todo後から実装
const callSummoners = async () => {
  //challengerのサモナーデータURL
  const url = 'https://jp1.api.riotgames.com/tft/league/v1/master?';
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
  const puuidList = [];
  // 今回は5回分、回すようにする。
  for (var i = 0; i < 5; i++) {
    const summoner: string = summoners.entries[i].summonerName;
    const puuid = await callPuuid(summoner);
    await puuidList.push(puuid);
    //TODO テスト用
    console.log(puuidList);
  }

  return puuidList;
};

//puuidを取得
const callPuuid = async (summonerName: string) => {
  summonerName = encodeURI(summonerName);
  console.log(summonerName);
  const url = `https://jp1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  const json = await res.json();

  const puuid = json.puuid;

  return puuid;
};

//matchid取得例"puuid"iy2-J3GJWmXSO7l59Sxsm2yBL5f_Rvqh-NFPOoKave2IceHx-o9BpsXs61JomD32DZNbdNDqjApllA
const callMatchid = async (puuidList: string[]) => {
  const matchidList: string[] = [];
  //puuidList分ループする。
  for (const puuid of puuidList) {
    const url = `https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=20`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Riot-Token': api_key,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    const json: string[] = await res.json();
    if (json != undefined) {
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
  const matchDataList: matchData[] = [];
  const playerDtoList: playerDto[] = [];
  //マッチデータを取得
  for (var i = 0; i < 80; i++) {
    const matchid: string = matchidList[i];
    const url = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchid}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Riot-Token': api_key,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    const json = await res.json();

    for (const participants of json.info.participants) {
      const traiDtoList: traitDto[] = [];
      //特性を取得しtraiDtoListに格納する。
      for (const traitdata of participants.traits) {
        const type = () => {
          for (const traits of traitsdata) {
            if (traits.key == traitdata.name) return traits.type;
          }
          return 'タイプが存在しない';
        };
        const traitDto: traitDto = {
          name: traitdata.name,
          num_units: traitdata.num_units,
          tier_current: traitdata.tier_current,
          type: type(),
        };
        // console.log('入れる前');
        // console.log(traitDto);
        traiDtoList.push(traitDto);
      }

      //チャンピオンを取得しunitsDtoListに格納する。
      const unitsDtoList: unitDto[] = [];
      for (const unitdata of participants.units) {
        const unitDto: unitDto = {
          champion: unitdata.character_id,
          rarity: unitdata.rarity,
          tier: unitdata.tier,
        };
        unitsDtoList.push(unitDto);
      }
      //console.log('前');
      //console.log(traiDtoList);
      //発動している特性ランクかつユニット数の大きい順に並べ替える
      traiDtoList.sort(function (a, b) {
        if (a.tier_current > b.tier_current) return -1;
        if (a.tier_current > b.tier_current) return 1;
        if (a.num_units > b.num_units) return -1;
        if (a.num_units < b.num_units) return 1;
        return 0;
      });
      // console.log('後ろ');
      // console.log(traiDtoList);
      const playerDto: playerDto = {
        traiDtoList: traiDtoList,
        unitList: unitsDtoList,
        rank: participants.placement,
      };

      playerDtoList.push(playerDto);
    }

    const matchData: matchData = {
      galaxiesmode: json.info.game_variation,
      playerDtoList: playerDtoList,
    };
    matchDataList.push(matchData);
  }
  return matchDataList;
};

//モード判別
const fetchMode = (paths: string) => {
  for (const galaxies of galaxiesdata) {
    if (galaxies.janame === paths) return galaxies.key;
  }
  return 'TFT3_GameVariation_None';
};

//チーム名を決める TODO
const teamName = (matchData: matchData) => {
  for (const playerDtoList of matchData.playerDtoList) {
    for (const traiDto of playerDtoList.traiDtoList) {
      const typeOrigin: string = 'origin';
      const typeClass: string = 'class';
      const single_name = (type: string) => {
        if (traiDto.type != type) {
          return 'origin';
        }
        return 'class';
      };
      const team_name: string =
        single_name(typeOrigin) + single_name(typeClass);
      return team_name;
    }
  }
};

//特性、チャンピオン名を並び替える
const kindSingledata = (matchData: matchData) => {};

export default retrieve_galaxies;

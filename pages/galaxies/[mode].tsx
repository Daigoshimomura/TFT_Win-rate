import React from 'react';
import Header from '../../components/header';
import Pick from '../../components/galaxiesmodepick_select';
import styles from './galaxies.module.css';
import Win from '../../components/winrate';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { compileFunction } from 'vm';
import championdata from '../../public/json/champions.json';
import galaxiesdata from '../../public/json/galaxies.json';
import traitsdata from '../../public/json/traits.json';
import { match } from 'assert';
import { type } from 'os';

type Props = {
  tier: string;
};

const Post: React.FC<Props> = (props) => {
  return (
    <body>
      <title>galaxies</title>
      <Header />
      <div className={styles.centerpaper}>
        <Pick />
        <Win />
      </div>
    </body>
  );
};

const api_key = 'RGAPI-b6ae253b-340c-4a2f-bf48-3e972f9f563d';

export const getStaticProps: GetStaticProps = async (paths) => {
  const url = 'https://jp1.api.riotgames.com/tft/league/v1/challenger?';

  //apiからデータ取得
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  const summoners = await res.json();
  const puuidList = [];
  // 今回は5回分、回すようにする。
  for (var i = 0; i < 5; i++) {
    const summoner: string = summoners.entries[i].summonerName;
    const puuid = await callPuuid(summoner);
    await puuidList.push(puuid);
    console.log(puuidList);
  }

  const matchidList: string[] = await callMatchid(puuidList);
  console.log(matchidList);
  const matchDataList = await callData(matchidList);

  const mode = () => {
    for (const galaxies of galaxiesdata) {
      if (galaxies.janame === paths) return galaxies.key;
    }
    return 'TFT3_GameVariation_None';
  };

  type statistics_data = {
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

  var matchcount: number = 0;

  const statistics_data: statistics_data = {};
  //取得してきたデータを整理
  for (const matchData of matchDataList) {
    if (matchData.galaxiesmode === mode()) {
      matchcount++;
      //チーム名を決める
      for (const playerDtoList of matchData.playerDtoList) {
        for (const traiDto of playerDtoList.traiDtoList) {
          const team_name = () => {
            const typeOrigin: string = 'origin';
            const typeClass: string = 'class';

            if (traiDto.type === typeOrigin) {
            }
          };
        }
      }
    }
  }

  return {
    props: {},
  };
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

//data取得例"matchid"JP1_208710881
const callData = async (matchidList: string[]) => {
  type matchData = {
    //ギャラクシーモード
    galaxiesmode: string;
    //プレイヤーごとのデータ
    playerDtoList: playerDto[];
  };

  type playerDto = {
    //発動している特性
    traiDtoList: traitDto[];
    //ユニットリスト
    unitList: unitDto[];
    //順位
    rank: string;
  };

  type traitDto = {
    //特性名
    name: string;
    //特性のユニット数
    num_units: number;
    //発動している特性のランク
    tier_current: number;
    //type
    type: string;
  };

  type unitDto = {
    //チャンピオン名
    champion: string;
    //チャンピオンのコスト
    rarity: number;
    //チャンピオンの重なり具合
    tier: number;
  };

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

    //特性を取得しtraiDtoListに格納する。todo==
    const traiDtoList: traitDto[] = [];
    for (const participants of json.info.participants) {
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
      console.log('前' + traiDtoList);
      //発動している特性ランクかつユニット数の大きい順に並べ替える
      traiDtoList.sort(function (a, b) {
        if (a.tier_current > b.tier_current) return -1;
        if (a.tier_current > b.tier_current) return 1;
        if (a.num_units > b.num_units) return -1;
        if (a.num_units < b.num_units) return 1;
        return 0;
      });
      console.log('後' + traiDtoList);
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { mode: '宝の山' } },
      // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  };
};

export default Post;

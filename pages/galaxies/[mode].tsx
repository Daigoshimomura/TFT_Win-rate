import React from 'react';
import Header from '../../components/header';
import Pick from '../../components/galaxiesmodepick_select';
import styles from './galaxies.module.css';
import Win from '../../components/winrate';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { compileFunction } from 'vm';
import Match, { MetadataDto } from '../../components/matchDto';

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

const api_key = 'RGAPI-1c5fe0d0-2a58-46e2-9380-848043e369f5';

export const getStaticProps: GetStaticProps = async (paths) => {
  paths.params?.mode;

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
  // TODO とりあえず一人分だけ実装する。後で全部取るようにする。

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

  type statistics_data = {
    galaxie;
  };

  //取得してきたデータを整理
  for (const matchData of matchDataList) {
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

    //特性を取得しtraiDtoListに格納する。
    const traiDtoList: traitDto[] = [];
    for (const participants of json.info.participants) {
      for (const traitdata of participants.traits) {
        const traitDto: traitDto = {
          name: traitdata.name,
          num_units: traitdata.num_units,
          tier_current: traitdata.tier_current,
        };
        traiDtoList.push(traitDto);
      }

      //チャンピオンを取得しunitsDtoListに格納する。
      const unitsDtoList: unitDto[] = [];
      for (const unitdata of participants.units) {
        const unitDto: unitDto = {
          //なぜかデータがとれない
          champion: unitdata.name,
          rarity: unitdata.rarity,
          tier: unitdata.tier,
        };
        unitsDtoList.push(unitDto);
        console.log(unitDto);
      }

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
      { params: { mode: 'hoge' } },
      // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  };
};

export default Post;

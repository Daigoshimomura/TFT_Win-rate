import React from 'react';
import Header from '../../components/header';
import Pick from '../../components/galaxiesmodepick_select';
import styles from './galaxies.module.css';
import Win from '../../components/winrate';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Summoner from '../../components/summoner';
import { compileFunction } from 'vm';
import Match from '../../components/matchDto';

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

const api_key = 'RGAPI-c18fbaa4-e231-4cfc-92c5-f0de76c43e9b';

export const getStaticProps: GetStaticProps = async (paths) => {
  paths.params?.mode;

  const url = 'https://jp1.api.riotgames.com/tft/league/v1/challenger?';

  //apiからデータ取得
  const req = fetch(`${url}api_key=${api_key}`, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((jsonData) => {
      const summonerName = jsonData.entries[3].summonerName;
      console.log(summonerName);

      const puuid = callPuuid(summonerName);
      console.log(puuid);

      const matchid = callMatchid(puuid);
      console.log(matchid);
    });

  // const er = data.LeagueListDTO.tier;
  // console.log(er);

  return {
    props: {},
  };
};

//puuidを取得
const callPuuid = (summonerName: string): string => {
  summonerName = encodeURI(summonerName);
  console.log(summonerName);
  const url = `https://jp1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}`;
  const req = fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      const puuid: string = jsonData.puuid;
      console.log(puuid);
      return puuid;
    });

  //りーり
  return 'iy2-J3GJWmXSO7l59Sxsm2yBL5f_Rvqh-NFPOoKave2IceHx-o9BpsXs61JomD32DZNbdNDqjApllA';
};

//matchid取得例"puuid"iy2-J3GJWmXSO7l59Sxsm2yBL5f_Rvqh-NFPOoKave2IceHx-o9BpsXs61JomD32DZNbdNDqjApllA
const callMatchid = (puuid: string): string => {
  const url = `https://jp1.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids`;

  const req = fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      const matchid = jsonData[0];
      console.log(matchid);
      return matchid;
    });

  return 'JP1_208710881';
};

//data取得例"matchid"JP1_208710881
const callData = (matchId: string): Match => {
  const url = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchId}`;

  const req = fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': api_key,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);

      return jsonData;
    });
  const match: Match;
  return match;
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

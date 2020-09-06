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
import retrieve_galaxies from '../../api/apicall';
import retrieve_data from '../../util/retrieve_data';

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

export const getStaticProps: GetStaticProps = async (paths) => {
  //ギャラクシーデータ
  const retrieve_data: retrieve_data = await retrieve_galaxies(paths);

  const mode = () => {
    for (const galaxies of galaxiesdata) {
      if (galaxies.janame === paths) return galaxies.key;
    }
    return 'TFT3_GameVariation_None';
  };

  var matchcount: number = 0;

  //取得してきたデータを整理
  for (const matchData of matchDataList) {
    const team_name = teamName(matchData);
  }

  return {
    props: {},
  };
};

const teamName = (matchData: mathcData) => {
  if (matchData.galaxiesmode === mode()) {
    matchcount++;
    //チーム名を決める
    for (const playerDtoList of matchData.playerDtoList) {
      for (const traiDto of playerDtoList.traiDtoList) {
        const typeOrigin: string = 'origin';
        const typeClass: string = 'class';
        const team_name: string =
          single_name(typeOrigin) + single_name(typeClass);
        const single_name = (type: string) => {
          if (traiDto.type != typeOrigin) {
            return 'origin';
          }
          return 'class';
        };
      }
    }
  }
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

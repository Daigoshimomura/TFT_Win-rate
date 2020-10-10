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
import { RetrieveData } from '../../util/retrieve_data';

type Hoge = {
  fuga: string;
};
type Props = {
  tier: string;
  hoge?: Hoge;
};

type Paths = {
  params: {
    mode: string;
  };
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

export const getStaticProps = async ({ params }: Paths) => {
  const mode: string = params?.mode;
  //ギャラクシーデータ
  const retrieve_data: RetrieveData = await retrieve_galaxies(mode);

  return {
    props: { mode },
  };
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

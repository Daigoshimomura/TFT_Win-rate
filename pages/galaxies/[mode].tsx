import React from 'react';
import Header from '../../components/header';
import Pick from '../../components/galaxiesmodepickSelect';
import styles from './galaxies.module.css';
import Win from '../../components/winrate';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { compileFunction } from 'vm';
import { match } from 'assert';
import { type } from 'os';
import retrieve_galaxies from '../../api/apicall';
import { RetrieveData } from '../../util/retrieveData';

type Props = {
  data: RetrieveData;
};

type Paths = {
  params: {
    mode: string;
  };
};

const Post: React.FC<Props> = ({ data }) => {
  return (
    <body>
      <title>galaxies</title>
      <Header />
      <div className={styles.centerpaper}>
        <Pick singleRetrieve={data.singleRetrieve} />
        <Win />
        {data.galaxiesmode?.toString()}
      </div>
    </body>
  );
};

export const getStaticProps = async ({ params }: Paths) => {
  const mode: string = params?.mode;
  //ギャラクシーデータ
  const retrieveData: RetrieveData = await retrieve_galaxies(mode);
  console.log(`getStaticProps=${retrieveData}`);

  return {
    props: {
      data: retrieveData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { mode: '宝の山' } },
      { params: { mode: 'ニーコバース' } },
      { params: { mode: 'トレードセクター' } },
      { params: { mode: '超高密度ギャラクシー' } },
      { params: { mode: '準惑星' } },
      { params: { mode: 'ギャラクティックアーモリー' } },
      { params: { mode: 'ライラック星雲' } },
      { params: { mode: '流星群' } },
    ],
    fallback: false,
  };
};

export default Post;

import React from 'react';
import Header from '../../components/header';
import Pick from '../../components/galaxiesmodepickSelect';
import styles from './galaxies.module.css';
import Win from '../../components/winrate';
import { GetStaticPaths } from 'next';
import retrieveGalaxies from '../../api/apicall';
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
        <Pick retrieveData={data} />
        <Win singleRetrieve={data.singleRetrieve} />
      </div>
    </body>
  );
};

export const getStaticProps = async ({ params }: Paths) => {
  const mode: string = params?.mode;
  //ギャラクシーデータ
  const retrieveData: RetrieveData = await retrieveGalaxies(mode);
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

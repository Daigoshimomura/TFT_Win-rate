import React from 'react';
import Header from '../../components/header';
import Pick from '../../components/galaxiesmodepick_select';
import styles from './galaxies.module.css';
import Win from '../../components/winrate';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  score: number;
};

const Post: React.FC<Props> = (props) => {
  return (
    <body>
      <title>galaxies</title>
      <Header />
      <div className={styles.centerpaper}>
        {props.score}
        <Pick />
        <Win />
      </div>
    </body>
  );
};

export const getStaticProps: GetStaticProps = async (paths) => {
  paths.params?.mode;
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const json = await res.json();
  return {
    props: {
      score: json.socre,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { mode: 'hoge' } },
      { params: { mode: 'fuga' } },
      { params: { mode: 'fuge' } }, // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  };
};

export default Post;

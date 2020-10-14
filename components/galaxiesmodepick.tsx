import React from 'react';
import styles from './galaxiesmodepick.module.css';
import Link from 'next/link';
import modedate from '../public/json/galaxies.json';

//初期画面の各ギャラクシーモードのボタン遷移画像
//ここのdiv修正。indexを見ないように変更
type Props = {};

const Pick: React.FC = () => {
  const elms = modedate.galaxies.map((elm, index) => {
    return (
      <div className={styles.galaxies}>
        <Link href={`/galaxies/${elm.janame}`}>
          <img
            className={styles.galaxiesimg}
            src={`/Galaxiesmode/${elm.key}.png`}
            alt={elm.janame}
          />
        </Link>
      </div>
    );
  });
  return <div className={styles.galaxiesmode}>{elms}</div>;
};

export default Pick;

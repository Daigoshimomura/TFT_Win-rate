import React from 'react';
import styles from './gamemode.module.css';
import Link from 'next/link';
import modedate from '../public/json/galaxies.json';

//初期画面のゲームモード単体

const Singlegamemode: React.FC = () => {
  const elms = modedate.galaxies.map((elm, index) => {
    return (
      <>
        <Link href={`/galaxies/${elm.janame}`}>
          <div key={index} className={styles.game}>
            <img
              className={styles.gamemodeimg}
              src={`/Galaxiesmode/${elm.key}.png`}
              alt={elm.janame}
            />
            <div className={styles.text}>
              <p className={styles.title}>{elm.janame}</p>
              <p className={styles.description}>{elm.description}</p>
            </div>
          </div>
        </Link>
      </>
    );
  });
  return <div>{elms}</div>;
};

export default Singlegamemode;

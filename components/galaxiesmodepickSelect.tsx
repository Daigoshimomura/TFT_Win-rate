import React from 'react';
import styles from './galaxiesmodepickSelect.module.css';
import Link from 'next/link';
import { RetrieveData } from '../util/retrieveData';
import modedate from '../public/json/galaxies.json';

//galaxies画面のgalaxies選択

type Props = {
  retrieveData?: RetrieveData;
};

const Pick: React.FC<Props> = ({ retrieveData }) => {
  const elms = modedate.galaxies.map((elm, index) => {
    if (retrieveData?.galaxiesmode === elm.janame) {
      return (
        <div className={styles.galaxiespick}>
          <Link href={`/galaxies/${elm.janame}`}>
            <img
              className={styles.galaxiesimgpick}
              src={`/Galaxiesmode/${elm.key}.png`}
              alt={elm.janame}
            />
          </Link>
        </div>
      );
    }
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

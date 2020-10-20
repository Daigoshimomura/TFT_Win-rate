import Reack from 'react';
import styles from './winrate.module.css';
import { SingleRetrieve } from '../util/retrieveData';

type Props = {
  singleRetrieve: SingleRetrieve[];
};

const Single: React.FC<Props> = ({ singleRetrieve }) => {
  const elms = singleRetrieve.map((elm) => {
    const traitsList = elm.traitList?.map((traits) => {
      return (
        <img
          className={styles.traitsimg}
          src={`/traits/${traits}.png`}
          alt={traits}
        />
      );
    });
    const championsList = elm.champion?.map((champion) => {
      return (
        <img
          className={styles.championsimg}
          src={`/champions/${champion}.png`}
          alt={champion}
        />
      );
    });
    return (
      <div className={styles.block}>
        <div className={styles.gap}></div>
        <div className={styles.titleline}>
          <div className={styles.titles}>
            <p className={styles.title}>{elm.teamName}</p>
          </div>
          <div className={styles.ranks}>
            <p className={styles.one}>1位</p>
            <div className={styles.fours}>
              <p className={styles.four}>4位</p>
              <img
                className={styles.yajirusi}
                src="/favicon/矢印.png"
                alt="矢印"
              />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.traits}>{traitsList}</div>
          <div className={styles.champions}>{championsList}</div>
          <div className={styles.rate}>
            <span className={styles.onerate}>{elm.firstPlace}</span>
            <span className={styles.fourrate}>{elm.fourRankOrMore}</span>
          </div>
        </div>
      </div>
    );
  });

  return <div> {elms} </div>;
};

export default Single;

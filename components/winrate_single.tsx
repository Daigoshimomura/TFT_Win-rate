import Reack from 'react';
import styles from './winrate.module.css';
import { title } from 'process';

const Single: React.FC = () => {
  return (
    <div className={styles.block}>
      <div className={styles.gap}></div>
      <div className={styles.titleline}>
        <div className={styles.titles}>
          <p className={styles.title}>サイバネティック</p>
          <p className={styles.title}>マナリーヴァ</p>
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
        <div className={styles.traits}>
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
          <img
            className={styles.traitsimg}
            src="/traits/astro.png"
            alt="astro"
          />
        </div>
        <div className={styles.champions}>
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
          <img
            className={styles.championsimg}
            src="/champions/ahri.png"
            alt="ahri"
          />
        </div>

        <div className={styles.rate}>
          <span className={styles.onerate}>79.0%</span>
          <span className={styles.fourrate}>79.0%</span>
        </div>
      </div>
    </div>
  );
};

export default Single;

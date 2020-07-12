import Reack from 'react';
import styles from './winrate.module.css';
import { title } from 'process';

const Single: React.FC = () => {
  return (
    <table className={styles.block}>
      <tbody>
        <tr className={styles.titleline}>
          <td colSpan={3}>
            <div className={styles.titles}>
              <p className={styles.title}>サイバネティック</p>
              <p className={styles.title}>マナリーヴァ</p>
            </div>
            <div className={styles.ranks}>
              <p className={styles.rank}>1位</p>
              <div className={styles.four}>
                <p className={styles.rank}>4位</p>
                <img
                  className={styles.yajirusi}
                  src="/favicon/矢印.png"
                  alt="矢印"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
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
          </td>
          <td className={styles.champions}>
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
          </td>
          <td>
            <div className={styles.rate}>
              <p className={styles.onerate}>79.0%</p>
              <p className={styles.foursrate}>79.0%</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Single;

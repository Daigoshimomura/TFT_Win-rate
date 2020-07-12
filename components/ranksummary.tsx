import Reack from 'react';
import Single from './summary_single';
import styles from './ranksummary.module.css';

const Ranksummary: React.FC = () => {
  return (
    <div className={styles.ranksummary}>
      <p className={styles.char}>
        <b>ランキングサマリー</b>
      </p>
      <Single />
      <Single />
      <Single />
      <Single />
      <Single />
    </div>
  );
};

export default Ranksummary;

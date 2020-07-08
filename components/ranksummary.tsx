import Reack from 'react';
import Single from './singlesummary';
import styles from './ranksummary.module.css';

const Ranksummary: React.FC = () => {
  return (
    <div className={styles.ranksummary}>
      <p className={styles.char}>ランキングサマリー</p>
      <Single />
      <Single />
      <Single />
      <Single />
      <Single />
    </div>
  );
};

export default Ranksummary;

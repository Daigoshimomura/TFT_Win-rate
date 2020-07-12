import Reack from 'react';
import styles from './winrate.module.css';
import Single from './winrate_single';

const Winrate: React.FC = () => {
  return (
    <div className={styles.winrate}>
      <Single />
    </div>
  );
};

export default Winrate;

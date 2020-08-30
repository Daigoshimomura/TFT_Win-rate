import Reack from 'react';
import styles from './gamemode.module.css';

const Singlegamemode: React.FC = () => {
  return (
    <div className={styles.game}>
      <img
        className={styles.gamemodeimg}
        src="/Galaxiesmode/TFT3_GameVariation_StartingItems.png"
        alt="mideamu Logo"
      />
      <div className={styles.text}>
        <p className={styles.title}>ミニレジェンド</p>
        <p className={styles.description}>
          試合開始時のプレイヤーの体力が85になります。（通常の体力は100）
        </p>
      </div>
    </div>
  );
};

export default Singlegamemode;

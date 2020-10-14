import Reack from 'react';
import styles from './gamemode.module.css';
import Game from './gamemode_single';

//初期画面のゲームモード

const Gamemode: React.FC = () => {
  return (
    <div className={styles.gamemode}>
      <p className={styles.char}>
        <b>ゲームモード</b>
      </p>
      <Game />
    </div>
  );
};

export default Gamemode;

import React from 'react';
import styles from './gamemode.module.css';
import Game from './gamemodeSingle';

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

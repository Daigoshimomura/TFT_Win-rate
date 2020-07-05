import React from 'react';
import styles from './header.module.css';
var folderPath = 'public/Galaxiesmode';

const obj = ['hoge', 'fuga', 'hogefuga'];

const Header: React.FC = () => {
  const loop = () => {
    return obj.map((obj) => {
      return <div>{obj}</div>;
    });
  };

  return (
    <header>
      {loop()}
      <div className={styles.header}>
        <h1 className={styles.title}>TFT</h1>
        <p className={styles.headerunder}>
          TFTのギャラクシーモードごとの勝率を知ることができます。
        </p>
      </div>
    </header>
  );
};

export default Header;

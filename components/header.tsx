import React from 'react';
import styles from './header.module.css';

const Header: React.FC = () => {
  return (
    <header>
      <div className={styles.header}>
        <i className={styles.title}>TFT</i>
        <p className={styles.headerunder}>
          TFTのギャラクシーモードごとの勝率を知ることができます。
        </p>
      </div>
    </header>
  );
};

export default Header;

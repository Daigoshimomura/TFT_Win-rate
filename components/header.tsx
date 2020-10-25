import React from 'react';
import styles from './header.module.css';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header>
      <div className={styles.header}>
        <Link href={`/`}>
          <i className={styles.title}>TFT</i>
        </Link>
        <p className={styles.headerunder}>
          TFTのギャラクシーモードごとの勝率を知ることができます。
        </p>
      </div>
    </header>
  );
};

export default Header;

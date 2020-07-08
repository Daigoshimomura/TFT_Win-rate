import React from 'react';
import Layout from '../components/layout';
import Header from '../components/header';
import styles from './index.module.css';

const Index: React.FC = () => {
  return (
    <body>
      <Header />
      <div className={styles.centerpaper}>
        <Layout>
          <title>TFT_Win-rate</title>

          <div>
            <p>ゲームモード</p>
          </div>
          <img
            src="/Galaxiesmode/ミディアムレジェンド.png"
            alt="mideamu Logo"
            width="100px"
            height="81px"
          />
          <p>ミニレジェンド</p>
          <p>試合開始時のプレイヤーの体力が85になります。（通常の体力は100）</p>
        </Layout>
      </div>
    </body>
  );
};

export default Index;

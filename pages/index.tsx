import React from 'react';
import Layout from '../components/layout';
import Header from '../components/header';
import styles from './index.module.css';

const Index: React.FC = () => {
  return (
    <body>
      <title>TFT_Win-rate</title>
      <Header />
      <div className={styles.centerpaper}>
        <Layout></Layout>
      </div>
    </body>
  );
};

export default Index;

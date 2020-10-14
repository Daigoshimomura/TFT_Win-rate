import React from 'react';
import Footer from './footer';
import Pick from './galaxiesmodepick';
import Rank from './ranksummary';
import Game from './gamemode';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Pick />
      <Game />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;

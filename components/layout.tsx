import React from 'react';
import Pick from './galaxiesmodepick';
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

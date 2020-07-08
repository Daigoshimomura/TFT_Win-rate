import React from 'react';
import Header from './header';
import Footer from './footer';
import Pick from './galaxiesmodepick';
import Rank from './ranksummary';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Pick />
      <Rank />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

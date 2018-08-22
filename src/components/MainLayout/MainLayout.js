import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ProgressBar from '../ProgressBar/ProgressBar';

// import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import './Layout.css';

const Layout = (props) => {
  return (
    <div className="app">
      <Header />
      <ProgressBar />
      <div className="content">
        {/* <BreadCrumbs /> */}
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

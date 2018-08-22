import React from 'react';

import './LoginLayout.css';
import logo from '../../images/secure-planet-logo.jpg';

const Layout = (props) => {
  return (
    <div className="login-layout">
      <div className="presentation">
        <img src={logo} role="presentation" />
        <p>Secure Planet is the world’s first decentralized security knowledge base.</p>
      </div>
      {props.children}
    </div>
  );
};


export default Layout;

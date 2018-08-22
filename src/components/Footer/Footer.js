import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Footer.css';

import logo from '../../images/secure-planet.png';

@observer(['state'])
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        logoImg: logo
    };
  }

  render() {
    return (
      <div>
          <div className="paddingFooter" />
          <footer>
            <div className="footerWrapper">
              <div className="footerYear">©2018</div>
              <a
                href={'http://secureplanet.io'}
                target="_blank" rel="noreferrer noopener"
              >
                  <img
                    src={this.state.logoImg}
                    // onMouseOver={this.handleMouseOver}
                    // onMouseOut={this.handleMouseOut}
                    role="presentation"
                  />
              <div className="footerName">Secure Planet</div>
              </a>
            </div>
          </footer>
      </div>
    );
  }
}

export default Footer;

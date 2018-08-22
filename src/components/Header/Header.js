import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import './Header.css';
import logo from '../../images/secure-planet.png';
import userPic from '../../images/user-pic.png';


@observer(['state'])
class Header extends Component {

  render() {
    const profileImg = this.props.state.user.image_thumb || '';

    let baseUrl = '//'.concat(location.hostname);
    let profileImgUrl = '';

    if (process.env.NODE_ENV === 'development') {
      baseUrl = baseUrl.concat(':3000');
    } else {
      baseUrl = location.port !== '' ? baseUrl.concat(':', location.port) : '';
    }

    profileImgUrl = profileImg !== '' ? baseUrl.concat(profileImg) : userPic;

    const img = <img className="user-pic" src={profileImgUrl} role="presentation" />;

    return (
      <div>
        <header>
          <div className="logoWrapper">
            <Link to="/demo">
              <img src={logo} role="presentation" />
              <div className="productName"> Secure Planet</div>
              {/*<div className="companyName">for {this.props.state.user.company}</div>*/}
            </Link>

          </div>
          <div className="header-menu">
            <ul>
              <li className="user">
                <span className="user-pic-wrap">{img}</span>
                <span className="userName">
                  {this.props.state.user.name || <Link to="/login" >GUEST</Link>}
                </span>
                <ul className="subMenu">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/logout">Log out</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;

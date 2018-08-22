import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';

import userPic from '../../images/user-pic.png';
import './UserProfile.css';

@observer(['state'])
class UserProfile extends Component {

  constructor(props) {
    super(props);
    //debugger // eslint-disable-line
    this.onDrop = this.onDrop.bind(this);
    this.router = this.props.router;

    this.picChanged = false;

    this.state = {
      name: {
        error: false,
        value: '',
        errorMsg: ''
      },
      email: {
        error: false,
        value: '',
        errorMsg: ''
      },
      file: {
        error: false,
        value: '',
        errorMsg: '',
        preview: null,
        image: null
      },
      fileName: 'Attach image',
    };
  }
  onDrop(files) {
    this.picChanged = true;
    this.setState({
      file: {
        preview: files[0].preview,
        image: files[0]
      }
    });
  }

  render() {
    const nameErrorClass = this.state.name.error ? 'show' : '';
    //const passErrorClass = this.state.pass.error ? 'show' : '';
    let baseUrl = '//'.concat(location.hostname);
    let profileImgUrl = '';

    if (process.env.NODE_ENV === 'development') {
      baseUrl = baseUrl.concat(':3000');
    } else {
      baseUrl = location.port !== '' ? baseUrl.concat(':', location.port) : '';
    }

    profileImgUrl = this.state.file.preview || baseUrl.concat(this.props.state.user.image_thumb, '?', new Date().getTime()) || userPic;

    return (
      <div className="profile">
        <form>
          <div className="form-row center">
            {this.props.state.user.use_ldap ?
              <Dropzone className="input-file" multiple={false} accept="image/*">
                <img className="userProfileImg" src={profileImgUrl} role="presentation" />
              </Dropzone>
              :
              <Dropzone onDrop={this.onDrop} className="input-file" multiple={false} accept="image/*">
                <img className="userProfileImg" src={profileImgUrl} role="presentation" />
              </Dropzone>
            }
          </div>

          <div className="form-row">
            <label>Email Address</label>
            <div className="email">{this.props.state.user.email === 'planet_resident@secureplanet.foundation' ? 'admin' : 'planet_resident@secureplanet.foundation'}</div>
          </div>

          <div className="form-row">
            <label>Name</label>
            <input type="text" ref="userName" disabled={this.props.state.user.use_ldap ? 'disabled' : ''} defaultValue={this.props.state.user.name} />
            <div className={`error ${nameErrorClass}`}>{this.state.name.errorMsg}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserProfile;

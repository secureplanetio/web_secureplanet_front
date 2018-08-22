import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import api from '../../api';
import './Login.css';
import Loader from '../Loader/Loader';

@observer(['state'])
class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.confirmAdmin = this.confirmAdmin.bind(this);
    this.resetAuthorizationError = this.resetAuthorizationError.bind(this);
    this.state = {
      isModal: false,
      email: {
        error: false,
        value: '',
        errorMsg: 'INVALID'
      },
      pass: {
        error: false,
        value: '',
        errorMsg: 'INVALID'
      },
      authorizationError: '',
      isLoading: false,
      cErrorMsg: '',
    };
  }
  onSubmit(event) {

    if (event) event.preventDefault();
    //hago comprobaciones
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.refs.email.value.toLowerCase() === 'admin' || this.refs.email.value.toLowerCase() === 'licensemanager') {
      this.setState(Object.assign(this.state, {
        email: {
          error: false
        }
      }));
    } else if (!this.refs.email || this.refs.email.value === '' || !re.test(this.refs.email.value)) {
      this.setState(Object.assign(this.state, {
        email: {
          error: true,
          errorMsg: 'INVALID'
        }
      }));
    } else {
      this.setState(Object.assign(this.state, {
        email: {
          error: false
        }
      }));
    }


    if (!this.refs.pass || this.refs.pass.value === '') {
      this.setState(Object.assign(this.state, {
        pass: {
          error: true,
          errorMsg: 'INVALID'
        }
      }));
    } else {
      this.setState(Object.assign(this.state, {
        pass: {
          error: false
        }
      }));
    }

    this.resetAuthorizationError();

    //si no hay error envio
    if (!this.state.email.error &&
      !this.state.pass.error) {
      //armo objeto para el envio
      const data = {
        email: this.refs.email.value,
        password: this.refs.pass.value,
        grant_type: 'password'
      };

      //envio
      api.getLogin(data)
        .then(this.setState({ isLoading: true }))
        .then((response) => {
          if (response.error && response.error === 'invalid_grant') {
            this.setState(Object.assign(this.state, {
              email: {
                error: true,
                errorMsg: 'INVALID'
              },
              pass: {
                error: true,
                errorMsg: 'INVALID'
              }
            }));
          } else {
            this.props.state.user.setSession(response);
            this.props.router.push('demo/security');
            if (response.required_setting) {
              this.props.state.user.setRequiredSetting(response.required_setting);
            }
          }
        })
        .catch((err) => {
          if (typeof err === 'undefined') {
            const authorizationError = 'Can not connect Database.';
            this.setState({
              authorizationError,
              isLoading: false,
            });
            return false;
          }

          if (err.status === 401) {
            if (err.data.error === 'password_change_required') {
              this.setState({
                isLoading: false,
                isModal: true,
              });

            } else {
              const authorizationError = err.data.error === 'user_not_active'
              ? 'This account is not active'
              : 'Invalid email or password';
              this.setState({
                authorizationError,
                isLoading: false,
              });
              this.refs.pass.value = '';
            }
          } else if (err.status === 500) {
            const authorizationError = 'Can not connect Database.';
            this.setState({
              authorizationError,
              isLoading: false,
            });
          }
        });
    }
  }

  closeModal() {
    this.setState({
      isModal: false,
    });
  }

  confirmAdmin(event) {
    if (event) event.preventDefault();
    if (this.refs.newPassword.value.length < 8) {
      this.setState({
        cErrorMsg: 'Password is at least 8 characters.',
      });
      return false;
    }
    if (this.refs.newPassword.value !== this.refs.cfmNewPassword.value) {
      this.setState({
        cErrorMsg: 'Wrong password confirmation.',
      });
      return false;
    }

    const data = {
      email: this.refs.email.value,
      current_password: this.refs.pass.value,
      password: this.refs.newPassword.value,
      password_confirmation: this.refs.cfmNewPassword.value,
    };

    api.confirmAdmin(data)
      .then(this.setState({ isLoading: true }))
      .then(() => {
        this.refs.pass.value = this.refs.newPassword.value;
        this.onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  resetAuthorizationError() {
    this.setState({ authorizationError: '' });
  }

  render() {
    const emailErrorClass = this.state.email.error ? 'show' : '';
    const passErrorClass = this.state.pass.error ? 'show' : '';

    const getLoginBtn = () => (
      this.state.isLoading ?
        <Loader />
      :
        <div className="button-wrapper">
          <button className="btn" type="submit">Login</button>
        </div>
    );


    return (
      <div className="login">
        <div />
        <form action="" onSubmit={this.onSubmit}>
          <div className="form-row">
            <label>ID:</label>
            <input type="text" name="email" ref="email" placeholder="Email" onChange={this.resetAuthorizationError} />
            <div className={`error ${emailErrorClass}`}>{this.state.email.errorMsg}</div>
          </div>
          <div className="form-row">
            <label>PASSWORD:</label>
            <input type="password" name="pass" ref="pass" placeholder="Password" onChange={this.resetAuthorizationError} />
            <div className={`error ${passErrorClass}`}>{this.state.pass.errorMsg}</div>
          </div>
          {
            /*
          <div className="form-row">
            <input className="checkbox" type="checkbox" name="" id="rememberMe" /> <label className="remember-me" htmlFor="rememberMe">Remember me</label>
            <a className="forgot-pass" href="">FORGOT YOUR PASSWORD</a>
          </div>
            */
          }
          <div className="error-full">{this.state.authorizationError}</div>
          {getLoginBtn()}
        </form>
        <Modal
          isOpen={this.state.isModal}
          onRequestClose={this.closeModal}
          className="modal modal-export modalChangePw"
          multiple="false"
          overlayClassName="modal-overlay"
          contentLabel="Login"
        >
          <div className="msg">
            <h2 className="title" ref="subtitle">Change Password</h2>
            <div className="hint">If you are logging in for the first time, you will need to change your password.</div>
            <form action="" onSubmit={this.confirmAdmin}>
              <div className="form-row">
                <label>New Password</label>
                <input type="password" name="newPassword" ref="newPassword" placeholder="New Password" onChange={this.resetAuthorizationError} />
              </div>
              <div className="form-row">
                <label>Password Confirmation</label>
                <input type="password" name="cfmNewPassword" ref="cfmNewPassword" placeholder="Password Confirmation" onChange={this.resetAuthorizationError} />
              </div>
              <button type="submit" style={{ display: 'none' }} />
            </form>
            <div className="cErrorMsg">{this.state.cErrorMsg}</div>
          </div>
          <div className="actions">
            <button className="btn" onClick={this.closeModal}>
              Cancel
            </button>
            <button className="btn callToAction" onClick={this.confirmAdmin}>
              Ok
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Login);

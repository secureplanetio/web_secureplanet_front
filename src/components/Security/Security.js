import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
//import $ from 'jquery';

import api from '../../api';
import './Security.css';
import Loader from '../Loader/Loader';

@observer(['state'])
class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryName: {
        value: '',
        error: false,
        errorMsg: '',
      },
      queryVersion: {
        value: '',
        error: false,
        errorMsg: '',
      },
      searchError: '',
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.resetSearchError = this.resetSearchError.bind(this);
  }
  componentDidMount() {
    localStorage.removeItem('ChartData');
  }
  onSubmit(event) {
    if (event) event.preventDefault();
    if (!this.refs.queryName.value || this.refs.queryName.value === '') {
      this.setState(Object.assign(this.state, {
        queryName: {
          error: true,
          errorMsg: 'INVALID',
        },
      }));
    } else {
      this.setState(Object.assign(this.state, {
        queryName: {
          error: false,
        },
      }));
    }

    if (!this.refs.queryVersion.value || this.refs.queryVersion.value === '') {
      this.setState(Object.assign(this.state, {
        queryVersion: {
          error: true,
          errorMsg: 'INVALID',
        },
      }));
    } else {
      this.setState(Object.assign(this.state, {
        queryVersion: {
          error: false,
        },
      }));
    }

    this.resetSearchError();

    if (!this.state.queryName.error && !this.state.queryVersion.error) {
      const data = {
        component: this.refs.queryName.value,
        represent_version: this.refs.queryVersion.value,
      };
      this.setState({ isLoading: true });
      api.getCveChart(data).then((response) => {
        localStorage.setItem('ChartData', JSON.stringify(response.response));
        this.props.router.push(`/demo/security/ShowResult/${data.component}/${data.represent_version}`);

      })
      .catch((err) => {
        if (err.status === 422) {
          this.props.router.push(`/demo/security/ShowHealthy/${data.component}/${data.represent_version}`);
        }
      });
    }
  }

  resetSearchError() {
    this.setState({ searchError: '' });
  }

  render() {
    const queryNameErrorClass = this.state.queryName.error ? 'show' : '';
    const queryVersionErrorClass = this.state.queryVersion.error ? 'show' : '';

    const getSearchBtn = () => (
      this.state.isLoading ?
        <Loader />
      :
        <div className="button-wrapper">
          <button className="btn" type="submin">Search</button>
        </div>
    );
    return (
      <div className="security">
        <h3><span className="title">Vulnerability of Open Source Software</span></h3>
          <form className="security-form" action="" onSubmit={this.onSubmit}>
            <div className="form-row-l">
              <label>Name</label>
              <input type="text" name="queryName" ref="queryName" placeholder="Open Source Name" onChange={this.resetSearchError} />
              <div className={`error ${queryNameErrorClass}`}>{this.state.queryName.errorMsg}</div>
            </div>
            <div className="form-row-r">
              <label>Version</label>
              <input type="text" name="queryVersion" ref="queryVersion" placeholder="Open Source Version" onChange={this.resetSearchError} />
              <div className={`error ${queryVersionErrorClass}`}>{this.state.queryVersion.errorMsg}</div>
            </div>
            <div className="error-full">{this.state.searchError}</div>
            {getSearchBtn()}
          </form>
      </div>
      );
  }
}

export default withRouter(Security);

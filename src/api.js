import axios from 'axios';
import { hashHistory } from 'react-router';
import store from './state';
import users from './api/users';

function parseJSON(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.request.response ? JSON.parse(response.request.response) : null;
  }
  return null;
}

function handleError(err) {
  return err.response;
}

const api = {
/**
 *  Make a request
 *
 * @param {string} url
 * @param {object} options
 * @returns Promise
 *
 */

  request: (path, options, urlAbsolute, isFile = false, handleUnAuthorized = true) => {
    let server = '';
    const baseUrl = '//'.concat(location.hostname);

    if (process.env.NODE_ENV === 'development') {
      server = baseUrl.concat(':3000') || process.env.API_HOST;
    } else {
      server = location.port !== '' ? baseUrl.concat(':', location.port) : '';
    }

    const config = {
      url: path,
      validateStatus(status) {
        if (status === 401 && handleUnAuthorized) {
          localStorage.removeItem('session');
          hashHistory.push('/login');
        }
        return status >= 200 && status < 300;
      },
    };

    if (!urlAbsolute) {
      config.url = server + path;
    }

    Object.assign(config, options);
    return new Promise((resolve, reject) => {

      axios(config)
        .then((response) => { resolve(isFile ? response.request.response : parseJSON(response)); })
        .catch((err) => {
          reject(handleError(err));
        });
    });
  },

  requestHtml: (path, options) => {
    let server = '';
    const baseUrl = '//'.concat(location.hostname);

    if (process.env.NODE_ENV === 'development') {
      server = baseUrl.concat(':3000') || process.env.API_HOST;
    } else {
      server = location.port !== '' ? baseUrl.concat(':', location.port) : '';
    }


    const config = {
      url: server + path,
      ...options
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then((response) => { resolve(response); })
        .catch((err) => {
          reject(handleError(err));
        });
    });
  },

  getStoragedToken: () => {
    const currentToken = localStorage.getItem('session')
      ? JSON.parse(localStorage.getItem('session')).access_token
      : '';
    const previousToken = store.user.access_token;
    if (previousToken !== currentToken) {
      location.reload();
    }
    return currentToken;
  },
};

export default Object.assign({}, api, users);

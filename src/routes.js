import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import MainLayout from './components/MainLayout/MainLayout';
import LoginLayout from './components/LoginLayout/LoginLayout';

import Security from './components/Security/Security';
import ShowResult from './components/Security/ShowResult';
import ShowHealthy from './components/Security/ShowHealthy';

import DemoPage from './components/DemoPage/DemoPage';
import DemoReport from './components/DemoPage/DemoReport';
import DemoVerify from './components/DemoPage/DemoVerify';
import DemoVerifyDetail from './components/DemoPage/DemoVerifyDetail';
import NoMatch from './components/NoMatch/NoMatch';

import Login from './components/Login/Login';
import UserProfile from './components/UserProfile/UserProfile';

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}
 */
function createRoutes({ state }) {
  function logout() {
    localStorage.removeItem('session');
  }
  function requireLogin(nextState, replaceState, next) {
    state.user.getValidSession().then(() => {
      next();
    })
      .catch(() => {
        replaceState('/login');
        next();
      });


  }

  return (<Route path="/">

    <IndexRedirect to="/demo" />
    <Route component={LoginLayout}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Login} onEnter={logout} />
    </Route>
    <Route component={MainLayout}>
      <IndexRoute component={DemoPage} />
      <Route path="main" component={DemoPage} title="Demo Page" />
      <Route path="report" component={DemoReport} title="Report" />
      <Route path="verify" component={DemoVerify} title="Verify" />
      <Route path="verify/detail" component={DemoVerifyDetail} title="Verify Detail" />
    </Route>

    <Route component={MainLayout} onEnter={requireLogin} >
      <Route path="demo" title="Demo" >
        <IndexRoute component={Security} />
        <Route path="security" component={Security} title="Demo" />
        <Route path="security/showresult/:queryName/:queryVersion" component={ShowResult} />
        <Route path="security/showhealthy/:queryName/:queryVersion" component={ShowHealthy} />
      </Route>

      <Route path="profile" component={UserProfile} title="Profile" />

      <Route path="*" component={NoMatch} />
    </Route>

  </Route>);
}

export default createRoutes;

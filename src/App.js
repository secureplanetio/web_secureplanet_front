import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Router, hashHistory } from 'react-router';

import routes from './routes';

class App extends Component {

  changeRoute() {
    if (this.props.extraself.props) {
      this.props.extraself.props.context.state.routerState.setRouter(this.state.routes);
    }
  }
  render() {
    const { context } = this.props;

    return (
      <Provider {...context}>
        <Router history={hashHistory} extraself={this} onUpdate={this.changeRoute}>
          {routes(context)}
        </Router>
      </Provider>
    );
  }
}


export default App;

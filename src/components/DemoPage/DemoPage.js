import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router';
import './DemoPage.css';


@observer(['state'])
class DemoPage extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="DemoPage">
        <div className="col">
          <div className="button-container-left">
            <Link to="/report">Report</Link>
          </div>
        </div>
        <div className="col">
          <div className="button-container-right">
            <Link to="/verify">Verify</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(DemoPage);

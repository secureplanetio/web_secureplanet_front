import React, { Component } from 'react';
import { observer } from 'mobx-react';

import './ProgressBar.css';

@observer(['state'])
class ProgressBar extends Component {

  render() {
    const display = this.props.state.report.uploadingProgress > 0 && this.props.state.report.uploadingProgress < 100 ? 'progressbar show-bar' : 'progressbar';
    const barStyle = {
      width: `${this.props.state.report.uploadingProgress}%`
    };

    return (
      <div className={display}>
        <div className="bar">
          <div className="progress" style={barStyle} >
            <span className="msg"><strong>({this.props.state.report.uploadingProgress}%) Uploading</strong> <i>“{this.props.state.report.name}”</i></span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;

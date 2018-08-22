import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import './ShowHealthy.css';
import smile from '../../images/Smiley_Face.png';

@observer(['state'])
class ShowHealthy extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack(e) {
    e.preventDefault();
    window.history.back();
  }

  render() {
    const binaryName = `${this.props.params.queryName}-${this.props.params.queryVersion}`;

    return (
      <div className="showhealthy">
        <h3>
          Vulnerability Of:&nbsp;&nbsp;&nbsp;
          <span className="highlighted">{binaryName} </span>
        </h3>
        <div className="presentation">
          <img src={smile} role="presentation" />
          <div className="text">
            <p> There is no vulnerability.</p>
          </div>
        </div>
        <div className="button-container">
           <button className="btn margin-medium" onClick={this.handleBack}>Search More</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ShowHealthy);

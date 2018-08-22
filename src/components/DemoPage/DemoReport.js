import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Dropzone from 'react-dropzone';
import './DemoReport.css';


@observer(['state'])
class DemoReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      ossName: 'OpenSSL',
      ossVersion: '1.0.3g',
      attackType: 'exec code overflow',
      description: 'Multiple race conditions in ssl/t1_lib.c in OpenSSL 0.9.8f through 0.9.8o, 1.0.0, and 1.0.0a, when multi-threading and internal caching are enabled.',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeVersion = this.handleChangeVersion.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
  }

  componentDidMount() {
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }
  handleBack() {
    window.history.back();
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ ossName: value });
  }

  handleChangeVersion(event) {
    const value = event.target.value;
    this.setState({ ossVersion: value });
  }

  handleChangeType(event) {
    const value = event.target.value;
    this.setState({ attackType: value });
  }

  handleChangeDesc(event) {
    const value = event.target.value;
    this.setState({ description: value });
  }

  render() {
    const dropzoneStyle = {
      width: '316px',
      height: '84px',
      borderWidth: '2px',
      borderColor: 'rgb(225, 225, 225)',
      borderStyle: 'dashed',
      borderRadius: '5px',
      fontSize: '13.3px',
      textAlign: 'left',
    };
    return (
      <div className="DemoReport">
        <div className="row">
          <div className="column">
            <h3>
              <span className="highlighted" style={{ textDecoration: 'underline' }}>Report</span>
            </h3>
          </div>
        </div>
        <div className="container">
          <div className="row company__item">
            <div className="column column-25">OSS Name: </div>
            <div className="column column-50">
              <input
                type="text"
                className="inputText inputText--lg"
                value={this.state.ossName}
                onChange={this.handleChangeName}
              />
            </div>
          </div>
          <div className="row company__item">
            <div className="column column-25">OSS Version: </div>
            <div className="column column-50">
              <input
                type="text"
                className="inputText inputText--lg"
                value={this.state.ossVersion}
                onChange={this.handleChangeVersion}
              />
            </div>
          </div>
          <div className="row company__item">
            <div className="column column-25">Attack Type: </div>
            <div className="column column-50">
              <input
                type="text"
                className="inputText inputText--lg"
                value={this.state.attackType}
                onChange={this.handleChangeType}
              />
            </div>
          </div>
          <div className="row company__item">
            <div className="column column-25">Description: </div>
            <div className="column column-50">
              <textarea
                type="text"
                className="inputText inputText--lg"
                value={this.state.description}
                onChange={this.handleChangeDesc}
              />
            </div>
          </div>
          <div className="row company__item">
            <div className="column column-25">Attachment: </div>
            <div className="column column-50">
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                style={dropzoneStyle}
                multiple={false}
              >
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
              <aside>
                <h6 style={{ textAlign: 'left', marginTop: '10px', marginBottom: '1px' }}> * Attached file </h6>
                <ul>
                  {
                    this.state.files.map(f => <p key={f.name}><span style={{ color: '#0052cc', textDecoration: 'underline' }}>{f.name}</span>  : {f.size} bytes</p>)
                  }
                </ul>
              </aside>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5%' }}>
          <button data-test="save-company" className="btn saveCompany" onClick={this.handleBack}>Submit</button>
        </div>
      </div>
    );
  }
}
export default withRouter(DemoReport);

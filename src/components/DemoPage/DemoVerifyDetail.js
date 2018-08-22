import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import acceptImg from '../../images/accept.png';
import blockImg from '../../images/block.png';
import './DemoVerifyDetail.css';
import ModalDemo from './ModalDemo';


@observer(['state'])
class DemoVerifyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      ossName: 'OpenSSL',
      ossVersion: '1.0.3g',
      attackType: 'exec code overflow',
      description: 'Multiple race conditions in ssl/t1_lib.c in OpenSSL 1.0.3g, when multi-threading and internal caching are enabled on a TLS server, might allow remote attackers to execute arbitrary code via client data that triggers a heap-based buffer overflow, related to (1) the TLS server name extension and (2) elliptic curve cryptography.',
      onefile: 'OpenSSL TLS server.txt',
      twofile: 'OpenSSL TLS server.script',
      voterComment: 'I voted accept as this is a similar method/issue with OpenSSL 1.1.0a exec code overflow hacking',
      nextVoterComment: 'I voted reject as I was not able to execute arbitrary code when tested',
      isOpenMIF: false,
      isOpenMC: false,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.router = this.props.router;
  }
  componentDidMount() {
  }
  onDrop(files) {
    this.setState({
      files,
    });
  }
  handleChange(event) {
    const value = event.target.value
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toUpperCase();
    this.props.state.company.setLicenseKey(value);
    this.props.state.company.setIsFileUploaded(false);
    //this.props.changeHandler();
  }
  handleBack(e) {
    e.preventDefault();
    window.history.back();
  }

  closeModal() {
    this.setState({
      isOpenMIF: false,
      isOpenMC: false,
    });
  }
  handleModal() {
    this.setState({
      isOpenMIF: false,
      isOpenMC: false,
    });
    this.router.push('/main');
  }
  acceptModal = () => {
    this.setState({
      isOpenMIF: true,
    });
  }

  blockModal = () => {
    this.setState({
      isOpenMC: true,
    });
  }

  render() {
    return (
      <div className="DemoVerifyDetail">
        <div className="row">
          <div className="column">
              <h3>
                SPV ID:&nbsp;&nbsp;&nbsp;
                <span className="highlighted"> 2018-92398</span>
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
              />
            </div>
          </div>
          <div className="row company__item">
            <div className="column column-25">Attachment: </div>
            <div className="column column-50">
              <aside>
                <h6 style={{ textAlign: 'left' }}> * Attached files </h6>
                <ul
                  style={{ textDecoration: 'underline', fontWeight: 'bold', fontSize: '14px', color: '#0052cc' }}
                >
                    {this.state.onefile}
                </ul>
                <ul
                  style={{ textDecoration: 'underline', fontWeight: 'bold', fontSize: '14px', color: '#0052cc' }}
                >
                  {this.state.twofile}
                </ul>
              </aside>
            </div>
          </div>
          <div className="row company__item">
            <div className="column column-25">Voters&apos; Comments: </div>
            <div className="column column-50">
              <textarea
                type="text"
                className="inputText inputText--lg"
                value={this.state.voterComment}
                style={{ height: '30px', margin: '0px' }}
                readOnly
              />
              <textarea
                type="text"
                className="inputText inputText--lg"
                value={this.state.nextVoterComment}
                style={{ height: '30px', margin: '0px' }}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="imagewrapper">
          <div className="row company__item">
            <div className="column column-25">
              <input type="image" className="imageL" src={acceptImg} onClick={() => this.acceptModal()} />
              <div className="imglabel">
                <p>Vote - accept</p>
              </div>
            </div>
            <div className="column column-25">
              <input type="image" className="imageR" src={blockImg} onClick={() => this.blockModal()} />
              <div className="imglabel">
                <p>Vote - reject</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button data-test="save-company" className="btn saveCompany" onClick={this.handleBack.bind(this)}>Back to List</button>
        </div>
        <ModalDemo
          isOpenMIF={this.state.isOpenMIF}
          closeModal={this.closeModal}
          handleModal={this.handleModal}
          contentType={'verify'}
        />
        <ModalDemo
          isOpenMIF={this.state.isOpenMC}
          closeModal={this.closeModal}
          handleModal={this.handleModal}
          contentType={'reject'}
        />
      </div>
    );
  }
}
export default withRouter(DemoVerifyDetail);

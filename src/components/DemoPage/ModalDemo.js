import React, { Component } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';
import cx from 'classnames';
import Loader from '../Loader/Loader';
import './ModalDemo.css';

@observer(['state'])
class ModalDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentId: props.contentId,
      contentType: props.contentType,
      requiredCvs: '*Required',
      content: '',
      isOpenMIF: props.isOpenMIF,
      modalAlert: false,
      isLoading: true,
      isOpenMC: false,
    };

    this.closeInfoModal = this.closeInfoModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }
  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    if (this.state.isOpenMIF === props.isOpenMIF) return false;

    this.setState(
      {
        isOpenMIF: props.isOpenMIF,
        contentId: props.contentId,
        contentType: props.contentType,
        title: '',
        isLoading: true,
      }, () => { this.getInfo(); });
  }
  getInfo() {
    let content = '';
    if (this.state.contentType === 'verify') {
      content = (
        <div className="modal-demo">
          <div> CVSS Calculation : <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => window.open('https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator', '')}>https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator</span></div>
          <span
            className={cx(
            'company__error',
              {
                'is-visible': this.state.requiredCvs,
              }
            )}
          >
            {this.state.requiredCvs}
          </span>
          <div className="row company__item" style={{ marginTop: '-10px' }}>CVSS Score:&nbsp;&nbsp;&nbsp;<input type="text" className="inputText inputText--lg" /> /10</div>
          <div> Comment : <textarea className="projectDesc" /></div>
        </div>
        );
        this.setState({
          title: 'Verify',
          isLoading: false,
          content,
        });
    } else if (this.state.contentType === 'reject') {
        content = (
          <div className="modal-demo">
            <div> Comment : <textarea className="projectDesc" /></div>
          </div>
        );
        this.setState({
          title: 'Reject',
          isLoading: false,
          content,
        });
    }
  }

  closeInfoModal() {
    this.setState({
      title: '',
      content: '',
    }, () => {
      this.props.closeModal();
    });
  }
  handleModal() {
      this.setState({
        title: '',
        content: '',
      }, () => {
        this.props.handleModal();
      });
  }

  render() {
    return (
      <div
        className="file-name project__info"
      >
        <Modal
          isOpen={this.state.isOpenMIF}
          onRequestClose={this.closeInfoModal}
          className="modal modalInfo"
          multiple="true"
          overlayClassName="modal-overlay"
          contentLabel="Modal"
        >
          <div className="msg">
            <h2 className="title">{this.state.title}</h2>
            <div className="content">
              {this.state.isLoading ? <Loader /> : this.state.content}
            </div>
          </div>
          <div className="actions">
            <button className="btn" onClick={this.closeInfoModal}>Cancel</button>
            <button className="btn callToAction" onClick={this.handleModal}>Submit</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalDemo;

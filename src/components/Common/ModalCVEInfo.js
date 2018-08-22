import React, { Component } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';
import Loader from '../Loader/Loader';

//import $ from 'jquery';

import './ModalCVEInfo.css';

import api from '../../api';

@observer(['state'])
class ModalCVEInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cveNum: props.cveNum,
      isOpenMC: props.isOpenMC,
      isLoading: true,
      vulnerableproducts: [],
      refsource: [],
      refurl: [],
      refdescription: [],
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    if (this.state.isOpenMC === props.isOpenMC) return false;
    this.setState({
      isOpenMC: props.isOpenMC,
      cveNum: props.cveNum,
      isLoading: true,
    }, () => { this.getCVEDetail(); });
  }

  getCVEDetail() {
    api.getCVEDetail(this.state.cveNum)
    .then((response) => {
      if (response.error) {
        console.log(response);
      } else {
        this.setState(Object.assign(response.response, { isLoading: false }));
      }
    });
  }

  handleCloseModal() {
    this.props.closeModalCVE();
  }

  render() {

    return (
      <Modal
        isOpen={this.state.isOpenMC}
        onRequestClose={this.handleCloseModal}
        className="modal modalCVEInfo"
        multiple="true"
        overlayClassName="modal-overlay"
        contentLabel="Modal"
      >
      {!this.state.isLoading ?
        <div>
          <h2 className="title" ref="subtitle">{this.state.cve}</h2>
          <div className="modalContent">
            <div className="cveItem">
              <span className="label">Description</span>
            </div>
            <div className="description">{this.state.description}</div>
            <div className="cveItem">
              <span className="label">Last Modified:</span><span className="value">{new Date(this.state.ddate).toString()}</span>
            </div>
            <div className="cveItem">
              <span className="label">CVSS v2 Base Score:</span><span className="value">{this.state.score}</span>
            </div>
            <div className="cveItem">
              <span className="label">Access Vector:</span><span className="value">{this.state.accessvector ? this.state.accessvector.toLowerCase() : ''}</span>
            </div>
            <div className="cveItem">
              <span className="label">Access Complexity:</span><span className="value">{this.state.accesscomplexity ? this.state.accesscomplexity.toLowerCase() : ''}</span>
            </div>
            <div className="cveItem">
              <span className="label">Confidentiality Impact:</span><span className="value">{this.state.confidentialityimpact ? this.state.confidentialityimpact.toLowerCase() : ''}</span>
            </div>
            <div className="cveItem">
              <span className="label">Integrity Impact:</span><span className="value">{this.state.integrityimpact ? this.state.integrityimpact.toLowerCase() : ''}</span>
            </div>
            <div className="cveItem">
              <span className="label">Availability Impact:</span><span className="value">{this.state.availabilityimpact ? this.state.availabilityimpact.toLowerCase() : ''}</span>
            </div>
            <div className="cveItem">
              <span className="label">Vulnerability Type:</span><span className="value">{this.state.type}</span>
            </div>
            <div className="cveItemW">
              <span className="label">Vulnerable software and versions</span>
              <ul>
                {this.state.vulnerableproducts.map((item) => {
                  return <li key={item.toString()}>{item.substr(7)}</li>;
                })}
              </ul>
            </div>
            <div className="cveItemW references">
              <span className="label">References to Advisories, Solutions, and Tools</span>
              <table cellSpacing="0px">
                <colgroup>
                  <col width="*" />
                  <col width="100px" />
                  <col width="*" />
                </colgroup>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Source</th>
                    <th>description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.refurl.map((item, i) => {
                    return (<tr key={item.toString()}>
                      <td><a href={this.state.refurl[i]} target="_blank" rel="noopener noreferrer">{this.state.refurl[i]}</a></td>
                      <td>{this.state.refsource[i]}</td>
                      <td>{this.state.refdescription[i]}</td>
                    </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="actions">
            <button className="btn" onClick={this.handleCloseModal}>Ok</button>
          </div>
        </div>
        :
        <Loader />
      }

      </Modal>
    );
  }
}

export default ModalCVEInfo;

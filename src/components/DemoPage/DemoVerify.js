import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, {
                  // plugins,
                  RowDefinition,
                  ColumnDefinition } from 'griddle-react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router';
import withLoader from '../_grid/withLoader';
import './DemoVerify.css';

const GriddleWithLoader = withLoader(Griddle);

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};


const enhancedWithRowData = connect((state, props) => {
  return {
    rowData: rowDataSelector(state, props),
  };
});


@observer(['state'])
class DemoVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
    //this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    this.getVerifyList();
  }
  getVerifyList() {
    this.setState({
      recordCount: 1,
      data: [
        {
          spvID: '2018-92398',
          ossName: 'OpenSSL',
          ossVersion: '1.0.3g',
          attackType: 'exec code overflow',
          status: '10day left',
        },
        {
          spvID: '2018-92399',
          ossName: 'Samba',
          ossVersion: '4.8.3',
          attackType: 'SQL injection',
          status: '7day left',
        },
        {
          spvID: '2018-92340',
          ossName: 'Curl',
          ossVersion: '7.32.0',
          attackType: 'buffer overflow',
          status: '5day left',
        },
        {
          spvID: '2018-91233',
          ossName: 'Zlib',
          ossVersion: '1.2.3',
          attackType: 'buffer overflow',
          status: '3day left',
        },
        {
          spvID: '2018-91112',
          ossName: 'Libpng',
          ossVersion: '1.4.3',
          attackType: 'SQL injection',
          status: '22hours left',
        },
      ],
      isLoading: false,
    });
  }
  /*
  handleBack(e) {
    e.preventDefault();
    window.history.back();
  }*/
  render() {
    const { data } = this.state;
    const firstColumn = ({ value }) => {  // eslint-disable-line no-unused-vars
      return (
        <Link className="spv-id" to={'verify/detail'}>
          {
            value || '-'
          }
        </Link>
      );
    };
    return (
      <div className="DemoVerify">
        <div className="row">
          <div className="column">
              <h3>
                <span className="highlighted" style={{ textDecoration: 'underline' }}>SPV Board</span>
              </h3>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="verifyList">
              <GriddleWithLoader
                loading={this.state.isLoading}
                tableClassName="tab"
                data={data}
                components={{
                  Filter: () => <span />,
                  SettingsToggle: () => <span />
                }}
              >
                <RowDefinition>
                  <ColumnDefinition cssClassName="col-1" id="spvID" title="SPV ID" customComponent={enhancedWithRowData(firstColumn)} />
                  <ColumnDefinition cssClassName="col-2" id="ossName" title="OSS Name" />
                  <ColumnDefinition cssClassName="col-3" id="ossVersion" title="OSS Version" />
                  <ColumnDefinition cssClassName="col-4" id="attackType" title="Attack Type" />
                  <ColumnDefinition cssClassName="col-5" id="status" title="Status" />
                </RowDefinition>
              </GriddleWithLoader>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(DemoVerify);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, {
                  // plugins,
                  RowDefinition,
                  ColumnDefinition } from 'griddle-react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { HorizontalBar, Chart } from 'react-chartjs-2';
import $ from 'jquery';

import api from '../../api';
import withLoader from '../_grid/withLoader';
import ModalCVEInfo from '../Common/ModalCVEInfo';
import './ShowResult.css';

const GriddleWithLoader = withLoader(Griddle);

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};


const enhancedWithRowData = connect((state, props) => {
  return {
    rowData: rowDataSelector(state, props)
  };
});

@observer(['state'])
class ShowResult extends Component {
  constructor(props) {
    super(props);
    this.textLimit = 30;
    //this.chartData = [];
    this.state = {
      isLoading: true,
      isModalOpen: false,
      isOpenMC: false,
      cveNum: '',
      recordCount: '',
      data: [],
      maxPages: 0,
      pageSize: 10,
      currentPage: 1,
      showMoreCharts: false,
      riskData: JSON.parse(localStorage.getItem('ChartData')),
    };
    this.handleBack = this.handleBack.bind(this);
    this.getCveInfo = this.getCveInfo.bind(this);
    this.router = this.props.router;
    this.setPageInfo = this.setPageInfo.bind(this);
    this.handleItemsPerPage = this.handleItemsPerPage.bind(this);
  }
  componentDidMount() {
    this.getRisks();
    //console.log(this.refs.chart.chart_instance);
    Chart.pluginService.register({
      beforeRender: (chart) => {
        if (chart.config.options.showAllTooltips) {
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((sector) => {
              chart.pluginTooltips.push(new Chart.Tooltip({
                _chart: chart.chart,
                _chartInstance: chart,
                _data: chart.data,
                _options: chart.options.tooltips,
                _active: [sector],
              }, chart));
            });
          });
          //turn off normal tooltips 
          chart.options.tooltips.enabled = false;
        }
      },
      afterDraw: (chart, easing) => {
        if (chart.config.options.showAllTooltips) {
            if (!chart.allTooltipsOnce) {
              if (easing !== 1) {
                return;
              }
              chart.allTooltipsOnce = true;
            }
            chart.options.tooltips.enabled = true;
            Chart.helpers.each(chart.pluginTooltips, (tooltip) => {
              tooltip.initialize();
              tooltip.update(); // we don't actually need this since we are not animating tooltips
              tooltip.pivot();
              tooltip.transition(easing).draw();
            });
            chart.options.tooltips.enabled = false;
        }
      }
    });
  }

  onNext = () => {
    const { currentPage } = this.state;
    this.getRisks(currentPage + 1);
  }

  onPrevious = () => {
    const { currentPage } = this.state;
    this.getRisks(currentPage - 1);
  }

  onGetPage = (pageNumber) => {
    this.getRisks(pageNumber);
  }

  getCveInfo = (number) => {
    const cveNum = number;
    //debugger // eslint-disable-line
    this.setState({
      isOpenMC: true,
      cveNum,
    });
  }

  getRisks(page_no, limit) {
    const pageNo = page_no || 1;
    const perPage = limit || this.state.pageSize;

    this.getRisksContent(pageNo, perPage);
    /*
    clearInterval(this.refreshInterval);
    this.refreshInterval = setInterval(() => {
      this.getRisksContent(pageNo, perPage);
    }, 10000);
    */
  }

  getRisksContent(pageNo, perPage) {
    const data = {
      component: this.props.params.queryName,
      represent_version: this.props.params.queryVersion,
      limit: perPage,
      page: pageNo,
    };

    api.getCveList(data)
    .then((response) => {
      this.setState({
         recordCount: response.pagination.count,
         data: response.response,
         pageSize: response.pagination.per_page,
         maxPages: response.pagination.pages,
         currentPage: response.pagination.current,
         isLoading: false,
      }, this.setPageInfo);
    });
  }


  setPageInfo() {
    $('<i class="fa fa-question-circle" aria-hidden="true" />').insertAfter('.sortable.security_issues > span');

    $('<span />', {
      class: 'totalCnt',
      text: '/ '.concat(this.state.maxPages),
    }).insertAfter('.griddle-page-select');

    $('<span />', {
      class: 'itemsPerPage',
      html: `Show <select class="itemsPerPageCnt">
                   <option value="10" ${this.state.pageSize === 10 ? 'selected' : ''}>10</option>
                   <option value="25" ${this.state.pageSize === 25 ? 'selected' : ''}>25</option>
                   <option value="50" ${this.state.pageSize === 50 ? 'selected' : ''}>50</option>
                   <option value="100" ${this.state.pageSize === 100 ? 'selected' : ''}>100</option>
                  </select>
             items per page
      `,
    }).appendTo('.griddle-pagination');
    $('.itemsPerPage').change(this.handleItemsPerPage);
  }

  closeModalCVE = () => {
    this.setState({
      isOpenMC: false,
    });
  }
  handleItemsPerPage(e) {
    this.getRisks('', e.target.value);
  }

  handleBack(e) {
    e.preventDefault();
    window.history.back();
  }

  toggleShowMoreCharts() {
    this.setState({
      showMoreCharts: !this.state.showMoreCharts,
    });
  }

  render() {
    const { data, currentPage, pageSize, recordCount } = this.state;
    const binaryName = `${this.props.params.queryName}-${this.props.params.queryVersion}`;
    const cveInfoColumn = ({ value, griddleKey, rowData }) => {  // eslint-disable-line no-unused-vars
      const cvePattern = /CVE-\d{4}-\d+/;
      const number = value.match(cvePattern)[0];
      return (
        <span data-cvenum={number} onClick={() => { this.getCveInfo(rowData.cve); }}>{value}</span>
      );
    };
    const riskData = this.state.riskData;
    const totalCount = riskData.risk.high + riskData.risk.medium + riskData.risk.low;
    const styleConfig = {
      classNames: {
        Row: 'row-class',
      },
      styles: {
        //Table: { border: '2px solid #555' },
      },
    };
    const barOptions = {
      legend: {
        position: 'center',
        labels: {
        },
      },
      tooltips: {
        enabled: false,
        callbacks: {
          /*
          label: (tooltipItem) => {
            return tooltipItem.xLabel;
          },
          */
          title: (tooltipItem) => {
            return tooltipItem.xLabel;
          },
        },
      },
      maintainAspectRatio: false,
      responsive: false,
      showAllTooltips: true,
      scales: {
        yAxes: [{
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          gridLines: {
            display: false,
          },
        }],
        xAxes: [{
          stacked: true,
          //display: false,
          gridLines: {
            display: true,
            //offsetGridLines: true,
          },
        }],
      },
    };
    const chartData = {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          backgroundColor: ['#FF0000', '#FF5E00', '#FFE400'],
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: ['#FFA7A7', '#FFC19E', '#FAED7D'],
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [riskData.risk.high, riskData.risk.medium, riskData.risk.low]
        },
      ],
    };

    return (
      <div className="showresult">
        <div className="row">
          <div className="column">
              <h3>
                Vulnerability of:&nbsp;&nbsp;&nbsp;
                <span className="highlighted">{binaryName} (Total Count: {totalCount}) </span>
              </h3>
          </div>
        </div>
        <div className="chart-row">
          <div className="chart-column">
            <HorizontalBar
              ref="chart"
              data={chartData}
              options={barOptions}
              height={200}
              width={700}
              redraw
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="riskDetail">
              <GriddleWithLoader
                loading={this.state.isLoading}
                tableClassName="tab"
                data={data}
                pageProperties={{
                  currentPage,
                  pageSize,
                  recordCount,
                }}
                events={{
                  onNext: this.onNext,
                  onPrevious: this.onPrevious,
                  onGetPage: this.onGetPage,
                }}
                components={{
                  Filter: () => <span />,
                  SettingsToggle: () => <span />
                }}
                styleConfig={styleConfig}
              >
                <RowDefinition>
                  <ColumnDefinition cssClassName="first-column" id="cve" title="Security ID" customComponent={enhancedWithRowData(cveInfoColumn)} />
                  <ColumnDefinition cssClassName="second-column" id="score" title="Score" />
                  <ColumnDefinition cssClassName="third-column" id="description" title="Description" />
                </RowDefinition>
              </GriddleWithLoader>

              <div className="button-container">
                <button className="btn margin-medium" onClick={this.handleBack}>Search More</button>
              </div>
                <ModalCVEInfo
                  isOpenMC={this.state.isOpenMC}
                  closeModalCVE={this.closeModalCVE}
                  cveNum={this.state.cveNum}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShowResult);

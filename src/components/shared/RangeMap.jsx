import React, { Component } from 'react';
import PropTypes from 'prop-types';
import d3Chart from './d3Chart';

export default class Chart extends Component {

  componentDidMount () {
    var el = this.el;
    d3Chart.create(el, {
      width: 150,
      height: 180
    }, this.getChartState());
  }

  componentDidUpdate () {
    var el = this.el;
    d3Chart.update(el, this.getChartState());
  }

  getChartState () {
    return {
      data: this.props.data,
      countiesByRegions: [] // TODO add in interaction information
    };
  }

  // componentWillUnmount () {
  //   var el = this.getDOMNode();
  //   d3Chart.destroy(el);
  // },

  render () {
    return (
      <div ref={(el) => this.el = el} className="Chart"></div>
    );
  }

};

Chart.propTypes = {
  data: PropTypes.array
}

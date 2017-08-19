import React, { Component } from 'react';
import PropTypes from 'prop-types';
import d3Chart from './d3Chart';

export default class Chart extends Component {

  componentDidMount () {
    var el = this.el;
    d3Chart.create(el, {
      width: 200,
      height: 230
    }, this.getChartState());
  }

  componentDidUpdate () {
    var el = this.el;
    d3Chart.update(el, this.getChartState());
  }

  getChartState () {
    return {
      range: this.props.range,
      interactionRange: this.props.interactionRange || [] // TODO add in interaction information
    };
  }

  render () {
    return (
      <div ref={(el) => this.el = el} className="Chart"></div>
    );
  }
}

Chart.propTypes = {
  interactionRange: PropTypes.array,
  range: PropTypes.array
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import d3Chart from './d3Chart';

export default class Chart extends Component {
  componentDidMount() {
    const { el } = this;
    d3Chart.create(el, {
      width: 200,
      height: 230,
    }, this.getChartState());
  }

  componentDidUpdate() {
    const { el } = this;
    d3Chart.update(el, this.getChartState());
  }

  getChartState() {
    return {
      range: this.props.range,
      interactionRange: this.props.interactionRange || [], // TODO add in interaction information
    };
  }

  render() {
    return (
      <div ref={(el) => { this.el = el; }} className="Chart" />
    );
  }
}

Chart.propTypes = {
  interactionRange: PropTypes.array,
  range: PropTypes.array,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Symptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    let { symptom } = this.props;
    let symptoms = symptom.symptoms.map(s => s.symptom).join('; ');
    let allMaturities = symptom.maturity.toLowerCase() === 'all';
    let message;
    if (!allMaturities) {
      message = `Affects ${symptom.maturity.toLowerCase()} ${symptom.subSite.toLowerCase() || 'tissue'}`;
    } else {
      message = 'All tissue maturities affected';
    }
    return (
      <li>
        <b>{symptom.plantPart.toUpperCase()}</b>
        &rarr; <b>{symptoms}</b>
        <div>
          { message }
        </div>
      </li>
    );
  }
}

Symptom.propTypes = {
  symptom: PropTypes.object
};

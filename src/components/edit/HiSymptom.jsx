import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, EnhancedCreatable } from '../shared/FormInputs';
import ButtonGroup from '../shared/ButtonGroup';
import { PRIMARY, BOOLEANS, MATURITIES } from './constants';
import { getSubSites } from '../../services/interactions';

export default class HiSymptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subSites: [],
    };
  }

  componentWillMount() {
    getSubSites()
      .then(subSites => this.setState({ subSites: subSites.map(s => ({ label: s, value: s })) }));
  }

  onButtonChange(e) {
    console.log(e.target.value, e.target.name);
  }

  render() {
    const { symptom } = this.props;
    const { subSites } = this.state;
    return (
      <div>
        <h3>{`${symptom.plantPart}: ${symptom.symptoms.map(s => ` ${s.symptom}`)}` }</h3>
        <RadioGroup title="Is Indirect?" selected={symptom.isIndirect} name={`isIndirect${symptom.id}`} options={BOOLEANS} />
        <RadioGroup title="Primary?" selected={symptom.isPrimary} name={`isPrimary${symptom.id}`} options={PRIMARY} />
        <ButtonGroup title="Maturity" name="maturity" selected={symptom.maturity} options={MATURITIES} onClick={this.onButtonChange} />
        <EnhancedCreatable
          title="SubSites"
          name="subSites"
          value={symptom.subSite}
          onChange={this.props.onInputChange}
          options={subSites}
          multi
        />
      </div>
    );
  }
}

HiSymptom.propTypes = {
  symptom: PropTypes.object,
  onInputChange: PropTypes.func,

};

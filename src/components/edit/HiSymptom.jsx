import React, { Component } from 'react';
import { RadioGroup, EnhancedCreatable } from '../shared/FormInputs';
import ButtonGroup from '../shared/ButtonGroup';
import { PRIMARY, BOOLEANS, MATURITIES, PLANT_PARTS } from './constants';
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
    const { symptom, buttonClick } = this.props;
    const { subSites } = this.state;
    return (
      <div>
        <h3>{`${symptom.symptoms[0].symptom}: ${symptom.plantPart}`}</h3>
        <RadioGroup title="Is Indirect?" selected={symptom.isIndirect} name={`isIndirect${symptom.id}`} options={BOOLEANS} />
        <RadioGroup title="Primary?" selected={symptom.isPrimary} name={`isPrimary${symptom.id}`} options={PRIMARY} />
        <ButtonGroup title="Maturity" name="maturity" selected={symptom.maturity} options={MATURITIES} onClick={this.onButtonChange} />
        <RadioGroup title="Plant Part" selected={symptom.plantPart} name={`plantPart${symptom.id}`} options={PLANT_PARTS} />
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

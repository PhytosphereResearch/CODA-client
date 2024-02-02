import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { RadioGroup, EnhancedCreatable } from '../shared/FormInputs';
import ButtonGroup from '../shared/ButtonGroup';
import { PRIMARY, BOOLEANS, MATURITIES } from './constants';
import { getSubSites } from '../../services/interactions';

export default class HiSymptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subSites: [],
      id: undefined,
      plantPart: undefined,
    };
    autobind(this);
  }

  componentWillMount() {
    getSubSites()
      .then(subSites => this.setState({
        subSites: subSites.map(s => ({ label: s, value: s })),
        id: this.props.symptom.id,
        plantPart: this.props.symptom.plantPart,
      }));
  }

  onSelectChange(options) {
    const { id } = this.state;
    this.props.onSelectChange(id, options);
  }

  onButtonChange(e) {
    const { id } = this.state;
    this.props.onButtonChange(e, id);
  }

  onRadioChange(e) {
    const { id } = this.state;
    this.props.onRadioChange(e, id);
  }

  onSymptomChange(e) {
    const { id } = this.state;
    this.props.onSymptomChange(id, e);
  }

  onSymptomRemove() {
    const { id, plantPart } = this.state;
    this.props.onSymptomRemove(id, plantPart);
  }

  render() {
    const { symptom, symptoms, hiSymptoms } = this.props;
    const { subSites, id } = this.state;
    const symptomList = symptom.symptoms.map(s => s.id);
    return (
      <div>
        <h3>
          <span>
            {typeof id !== 'number' ? <button onClick={this.onSymptomRemove}> X </button> : null}
            {`${symptom.plantPart} symptoms`}
          </span>
        </h3>
        <Select
          options={symptoms}
          onChange={this.onSymptomChange}
          value={symptomList}
          placeholder="Type to search by symptom"
          style={{ marginBottom: '15px' }}
          multi
        />
        <RadioGroup
          key={symptom.id}
          title="Is Indirect?"
          selected={symptom.isIndirect}
          name={`isIndirect&${symptom.id}`}
          options={BOOLEANS}
          onChange={this.onRadioChange}
        />
        <ButtonGroup title="Primary?" selected={symptom.isPrimary} name="isPrimary" options={PRIMARY} onClick={this.onButtonChange} />
        <ButtonGroup title="Maturity" name="maturity" selected={symptom.maturity} options={MATURITIES} onClick={this.onButtonChange} />
        <EnhancedCreatable
          title="SubSites"
          name="subSites"
          value={symptom.subSite}
          onChange={this.onSelectChange}
          options={subSites}
          multi
        />
      </div>
    );
  }
}

HiSymptom.propTypes = {
  symptom: PropTypes.object,
  symptoms: PropTypes.array,
  hiSymptoms: PropTypes.array,
  onSelectChange: PropTypes.func,
  onButtonChange: PropTypes.func,
  onRadioChange: PropTypes.func,
  onSymptomChange: PropTypes.func,
  onSymptomRemove: PropTypes.func,
};

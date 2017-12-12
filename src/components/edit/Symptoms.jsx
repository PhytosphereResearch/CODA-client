import React, { Component } from 'react';
import autobind from 'react-autobind';
import { TextInput, TextArea, Checkbox } from '../shared/FormInputs.jsx';
import Select from 'react-virtualized-select';
import { addOrUpdateSymptom } from 'coda/services/interactions';
import PropTypes from 'prop-types';

const blankSymptom = {
  symptom: '',
  description: '',
  acorn: false,
  branch: false,
  flower: false,
  leaf: false,
  root: false,
  trunk: false
};

const plantParts = ['acorn', 'branch', 'flower', 'leaf', 'root', 'trunk'];

export default class EditSymptoms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptom: { ...blankSymptom },
      selected: undefined
    };
    autobind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let symptom = { ...this.state.symptom };
    addOrUpdateSymptom(symptom)
      .then(this.props.refresh)
      .then(this.setState({ symptom: { ...blankSymptom }, selected: undefined }));
  }
  onSymptomSelected(option) {
    if (!option || !option.value) {
      this.setState({ selected: undefined, symptom: { ...blankSymptom } });
      return;
    }
    this.setState({ selected: option, symptom: option });
  }

  onInputChange(e) {
    let symptom = { ...this.state.symptom };
    let name = e.target.name;
    if (typeof this.state.symptom[name] === 'boolean') {
      symptom[name] = !this.state.symptom[name];
    } else {
      symptom[name] = e.target.value;
    }
    this.setState({ symptom: symptom });
  }

  render() {
    let { symptom, selected } = this.state;
    let { options } = this.props;
    let disabled = !(plantParts.some(pp => symptom[pp]) && symptom.symptom);

    return (
      <div>
        <h3>Symptoms</h3>
        <Select
          options={options}
          onChange={this.onSymptomSelected}
          value={selected}
          placeholder="Search by symptom"
          style={{ marginBottom: '15px' }}/>
          <h4>{this.state.selected ? 'Edit a Symptom:' : 'Add a Symptom:'}</h4>
        <form onSubmit={this.handleSubmit} onChange={this.onInputChange}>
          <TextInput title="Symptom Name" value={symptom.symptom} name="symptom"/>
          Plant parts:
          <div>
            <Checkbox name={'acorn'} title={'acorn'} isChecked={symptom.acorn} />
            <Checkbox name={'branch'} title={'branch'} isChecked={symptom.branch} />
            <Checkbox name={'flower'} title={'flower'} isChecked={symptom.flower} />
            <Checkbox name={'leaf'} title={'leaf'} isChecked={symptom.leaf} />
            <Checkbox name={'root'} title={'root'} isChecked={symptom.root} />
            <Checkbox name={'trunk'} title={'trunk'} isChecked={symptom.trunk} />
          </div>
          <TextArea title="Description" value={symptom.description} limit={65535} name="description"/>
          <button disabled={disabled} onClick={this.handleSubmit}>{symptom.id ? 'UPDATE' : 'SUBMIT'}</button>
        </form>
      </div>
    );
  }
}

EditSymptoms.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array
};

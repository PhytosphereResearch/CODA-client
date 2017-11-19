import React, { Component } from 'react';
import autobind from 'react-autobind';
import { TextInput, TextArea, Checkbox } from '../shared/FormInputs.jsx';

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

export default class EditSymptoms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptom: { ...blankSymptom }
    };
    autobind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Submit!', this.state.symptom);
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
    let { symptom } = this.state;
    return (
      <div>
        <h3>Symptoms</h3>
        <h2>Add or Edit a symptom</h2>
        {/* symptom dropdown goes here */}
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
          <button onClick={this.handleSubmit}>{symptom.id ? 'UPDATE' : 'SUBMIT'}</button>
        </form>
      </div>
    );
  }
}

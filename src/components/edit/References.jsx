import React, { Component } from 'react';
import Select from 'react-virtualized-select';
import autobind from 'react-autobind';
import { TextInput, TextArea } from '../shared/FormInputs.jsx';
import { addOrUpdateReference } from 'coda/services/interactions';
import PropTypes from 'prop-types';
// import { test } from 'coda/services/agents';
let blankRef = {
  year: '',
  description: '',
  author: '',
  title: '',
  source: '',
  notes: ''
};

let initialState = {
  selected: undefined,
  reference: { ...blankRef }
};

export default class EditReferences extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    autobind(this);
  }

  onRefSelected(option) {
    if (!option) {
      this.setState(initialState);
      return;
    }
    this.setState({ selected: option, reference: { ...option } });
  }

  onInputChange(e) {
    let reference = { ...this.state.reference, [e.target.name]: e.target.value };
    this.setState({ reference });
  }

  handleSubmit() {
    let reference = { ...this.state.reference };
    addOrUpdateReference(reference)
      .then(this.props.refresh)
      .then(() => this.setState(initialState));
  }

  render() {
    let { options } = this.props;
    let { selected, reference } = this.state;
    return (
      <div>
        <h3>References</h3>
        <Select
          options={options}
          onChange={this.onRefSelected}
          value={selected}
          placeholder="Search by reference"
          style={{ marginBottom: '15px' }}/>
          <h4>{this.state.selected ? 'Edit a Reference:' : 'Add a Reference:'}</h4>
          <form onSubmit={this.handleSubmit} onChange={this.onInputChange}>
            <TextInput title="Year" placeholder="YYYY" value={reference.year} name="year"/>
            <TextInput title="Description" placeholder="Authors (YYYY): short title" value={reference.description} name="description"/>
            <TextInput title="Author" value={reference.author} name="author"/>
            <TextInput title="Title" value={reference.title} name="title"/>
            <TextInput title="Source" value={reference.source} name="source"/>
            <TextArea title="Notes" value={reference.notes} name="notes"/>
          </form>
          <button onClick={this.handleSubmit}>{reference.id ? 'UPDATE' : 'SUBMIT'}</button>
      </div>
    );
  }
}

EditReferences.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array
};

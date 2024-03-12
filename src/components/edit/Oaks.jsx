import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Select from 'react-select';
import { getOak, addOrUpdateOak } from '../../services/oaks';
import { TextInput, TextArea } from '../shared/FormInputs';
import { FullScreenSpinner } from '../shared/shapes';
import pickBy from 'lodash/pickby';

const blankOak = {
  genus: '',
  subGenus: '',
  species: '',
  subSpecies: '',
  commonName: '',
  authority: '',
  evergreen: '',
  acorns: '',
  leaves: '',
  stems: '',
  treeForm: '',
  height: '',
  distribution: '',
  hybrids: '',
  varieties: '',
  notes: '',
};

export default class EditOaks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedOak: { ...blankOak },
    };
    autobind(this);
  }

  onOakSelected(option) {
    if (!option.value) {
      this.setState({ selected: null, selectedOak: { ...blankOak } });
      return;
    }
    this.setState({ selected: option });
    getOak(option.value)
      .then(oak => this.setState({ selectedOak: oak }));
  }

  onInputChange(e) {
    const oak = { ...this.state.selectedOak, [e.target.name]: e.target.value };
    this.setState({ selectedOak: oak });
  }

  onSubmit() {
    this.setState({ loading: true });
    const updateOak = pickBy(this.state.selectedOak, value => Boolean(value));
    addOrUpdateOak(updateOak)
      .then(this.props.refresh)
      .then(() => this.setState({ loading: false, selectedOak: { ...blankOak }, selected: undefined }))
      .catch(() => this.setState({ loading: false, error: true }));
  }

  render() {
    const { options } = this.props;
    const { selected, selectedOak } = this.state;

    return (
      <div>
        <h3>Oaks</h3>
        <Select
          options={options}
          onChange={this.onOakSelected}
          value={selected}
          placeholder="Type to search by species or common name"
          style={{ marginBottom: '15px' }}
        />
        <div>
          {this.state.loading ? <FullScreenSpinner /> : null}
          <div style={{ display: 'flex' }}>
            <TextInput title="Genus" value={selectedOak.genus} name="genus" onChange={this.onInputChange} />
            <TextInput title="Species" value={selectedOak.species} name="species" onChange={this.onInputChange} />
            <TextInput title="Sub-species" value={selectedOak.subSpecies} name="subSpecies" onChange={this.onInputChange} />
            <TextInput title="Taxonomic authority" value={selectedOak.authority} name="authority" onChange={this.onInputChange} />
          </div>
          <TextInput title="Sub-genus" value={selectedOak.subGenus} name="subGenus" onChange={this.onInputChange} />
          <TextInput title="Common name" value={selectedOak.commonName} name="commonName" onChange={this.onInputChange} />
          <TextInput title="Evergreen?" value={selectedOak.evergreen} name="evergreen" onChange={this.onInputChange} />
          <div style={{ display: 'flex' }}>
            <TextInput title="Form" value={selectedOak.treeForm} name="treeForm" onChange={this.onInputChange} />
            <TextInput title="Height" value={selectedOak.height} name="height" onChange={this.onInputChange} />
          </div>
          <TextArea title="Leaves" limit={500} value={selectedOak.leaves} name="leaves" onChange={this.onInputChange} />
          <TextArea title="Stems" value={selectedOak.stems} name="stems" onChange={this.onInputChange} />
          <TextInput title="Acorns" value={selectedOak.acorns} name="acorns" onChange={this.onInputChange} />
          <TextInput title="Hybrids" value={selectedOak.hybrids} name="hybrids" onChange={this.onInputChange} />
          <TextInput title="Varieties" value={selectedOak.varieties} name="varieties" onChange={this.onInputChange} />
          <TextInput title="Distribution (deprecated)" limit={500} value={selectedOak.distribution} name="distribution" onChange={this.onInputChange} />
          <TextArea title="Notes" value={selectedOak.notes} limit={65535} name="notes" onChange={this.onInputChange} />
          <button onClick={this.onSubmit}>{selectedOak.id ? 'UPDATE' : 'SUBMIT'}</button>
        </div>
      </div>
    );
  }
}

EditOaks.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array,
};

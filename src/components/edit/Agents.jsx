import React, { Component } from 'react';
import { BOOLEANS, ECOLOGY } from './constants';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Select from 'react-virtualized-select';
import { getAgent, getAgentFields, formatAgentFields, addOrUpdateAgent/*addOrUpdateAgent*/ } from 'coda/services/agents';
import { TextInput, TextArea, RadioGroup, EnhancedCreatable } from '../shared/FormInputs.jsx';
import { FullScreenSpinner } from '../shared/shapes.jsx';

let blankAgent = {
  torder: '',
  family: '',
  mostCommon: false,
  biotic: true,
  type: '',
  subType: '',
  subSubType: '',
  ecology: '',
  commonName: '',
  notes: ''
};

let blankSynonym = {
  genus: '',
  species: '',
  subSpecies: '',
  authority: '',
  isPrimary: true
};

export default class EditAgents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedSynonym: { ...blankSynonym },
      selectedAgent: { ...blankAgent },
      newAgent: true,
      fields: {},
      loading: false
    };
    autobind(this);
  }

  componentWillMount() {
    getAgentFields()
      .then((fields) => {
        let formatted = formatAgentFields(fields);
        this.updateFields(formatted);
      });

  }

  updateFields(fields) {
    this.setState({
      fields: fields
    });
  }

  onAgentSelected(option) {
    if (!option || !option.value) {
      this.setState({ selected: null, selectedAgent: { ...blankAgent }, selectedSynonym: { ...blankSynonym }, newAgent: true });
      return;
    }
    this.setState({ selected: option, newAgent: false });
    getAgent(option.value)
      .then(agent => this.setState({ selectedAgent: agent }));
  }

  onSelectChange(selected) {
    let agent = { ...this.state.selectedAgent, [selected.field]: selected.value };
    this.setState({ selectedAgent: agent });
  }

  onInputChange (e) {
    let agent = { ...this.state.selectedAgent, [e.target.name]: e.target.value };
    this.setState({ selectedAgent: agent });
  }

  onSynonymChange (e) {
    let synonym = { ...this.state.selectedSynonym, [e.target.name]: e.target.value };
    this.setState({ selectedSynonym: synonym });
  }

  onSubmit() {
    this.setState({ loading: true });
    let agent;
    if (this.state.newAgent) {
      agent = {};
      agent.agent = this.state.selectedAgent;
      agent.synonym = this.state.selectedSynonym;
    } else {
      agent = this.state.selectedAgent;
    }
    addOrUpdateAgent(agent)
      .then(this.props.refresh)
      .then(() => this.setState({
        loading: false,
        selectedAgent: { ...blankAgent },
        selectedSynonym: { ...blankSynonym },
        selected: undefined,
        newAgent: true
      }))
      .catch(() => this.setState({ loading: false, error: true }));
  }

  render() {
    let options = this.props.options;
    let { selected, selectedAgent, selectedSynonym } = this.state;
    return (
      <div>
        <h3>Agents</h3>
        <Select
          options={options}
          onChange={this.onAgentSelected}
          value={selected}
          placeholder="Search by species or common name"
          style={{ marginBottom: '15px' }}/>
          {this.state.loading ? <FullScreenSpinner /> : null}
        {
          this.state.newAgent
          ? <div style={{ display: 'flex' }}>
              <TextInput title="Genus" value={selectedSynonym.genus} name="genus" onChange={this.onSynonymChange}/>
              <TextInput title="Species" value={selectedSynonym.species} name="species" onChange={this.onSynonymChange}/>
              <TextInput title="Sub-species" value={selectedSynonym.subSpecies} name="subSpecies" onChange={this.onSynonymChange}/>
              <TextInput title="Taxonomic authority" value={selectedSynonym.authority} name="authority" onChange={this.onSynonymChange}/>
            </div>
          : null}
        <EnhancedCreatable title='Order' name='torder' value={selectedAgent.torder} onChange={this.onSelectChange} options={this.state.fields.torder} />
        <EnhancedCreatable title='Family' name="family" value={selectedAgent.family} onChange={this.onSelectChange} options={this.state.fields.family} />
        <RadioGroup title='Most Common' selected={selectedAgent.mostCommon} name='mostCommon' options={BOOLEANS} onChange={this.onInputChange}/>
        <RadioGroup title='Biotic' selected={selectedAgent.biotic} name='biotic' options={BOOLEANS} onChange={this.onInputChange}/>
        <EnhancedCreatable title='Type' value={selectedAgent.type} name="type" onChange={this.onSelectChange} options={this.state.fields.type} />
        <EnhancedCreatable title='Sub-type' value={selectedAgent.subType} name="subType" onChange={this.onSelectChange} options={this.state.fields.subType} />
        <EnhancedCreatable title='Sub sub-type' value={selectedAgent.subSubType} name="subSubType" onChange={this.onSelectChange} options={this.state.fields.subSubType} />
        <RadioGroup title='Ecology' selected={selectedAgent.ecology} name='ecology' options={ECOLOGY} onChange={this.onInputChange} />
        <TextInput title='Common Name' value={selectedAgent.commonName} name="commonName" onChange={this.onInputChange} />
        <TextArea title="Notes" value={selectedAgent.notes} limit={65535} name="notes" onChange={this.onInputChange}/>
        <button onClick={this.onSubmit}>SUBMIT</button>
      </div>
    );
  }
}

EditAgents.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array
};

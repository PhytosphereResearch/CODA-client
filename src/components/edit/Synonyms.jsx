import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-virtualized-select';
import { ScientificName, Synonyms } from '../shared/partials.jsx';
import { RadioGroup, TextInput, TextArea } from '../shared/FormInputs.jsx';
import { getAgent, addOrUpdateSynonym } from 'coda/services/agents';
import { arrayBufferToString } from 'coda/services/utils';
import { BOOLEANS } from './constants';
import autobind from 'react-autobind';

let blankSynonym = {
  genus: '',
  species: '',
  subSpecies: '',
  authority: '',
  isPrimary: false,
  notes: ''
};

export default class EditSynonyms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedAgent: undefined,
      formattedSynonyms: [],
      selectedSynonym: undefined,
      newSynonym: false,
      prevSynonym: undefined
    };
    autobind(this);
  }

  onAgentSelected(option) {
    if (!option || !option.value) {
      this.setState({
        selected: undefined,
        selectedAgent: undefined,
        formattedSynonyms: [],
        selectedSynonym: undefined,
        newSynonym: false,
        prevSynonym: undefined
      });
      return;
    }
    getAgent(option.value)
      .then((agent) => {
        let selectedSynonym = agent.synonyms.find((synonym) => {
          return synonym.id === option.synId;
        });
        selectedSynonym = { ...selectedSynonym };
        selectedSynonym.notes = arrayBufferToString(selectedSynonym.notes.data).replace(/ -/g, '\n-');
        this.setState({ selectedAgent: agent, selectedSynonym: selectedSynonym, selected: option, newSynonym: false });
      });
  }

  onSynonymSelected(option) {
    if (!option || !option.value) {
      this.setState({ selectedSynonym: null });
      return;
    }
    this.setState({ selectedSynonym: option.value });
  }

  onSynonymChange(e) {
    let updatedSynonym = { ...this.state.selectedSynonym, [e.target.name]: e.target.value };
    this.setState({
      selectedSynonym: updatedSynonym
    });
  }

  onAgentChange(e) {
    let updatedAgent = { ...this.state.selectedAgent, [e.target.name]: e.target.value };
    this.setState({
      selectedAgent: updatedAgent
    });
  }

  createSynonym() {
    if (this.state.newSynonym) {
      this.setState({ newSynonym: !this.state.newSynonym, selectedSynonym: { ...this.state.prevSynonym } });
    } else {
      let prevSynonym = { ...this.state.selectedSynonym };
      this.setState({ newSynonym: !this.state.newSynonym, selectedSynonym: { ...blankSynonym }, prevSynonym: prevSynonym });
    }
  }

  submitSynonym() {
    let submittedSynonym = { ...this.state.selectedSynonym };
    if (submittedSynonym.isPrimary === 'true' || submittedSynonym.isPrimary === true) {
      submittedSynonym.isPrimary = 1;
    } else {
      submittedSynonym.isPrimary = 0;
    }
    if (this.state.newSynonym) {
      submittedSynonym.agentId = this.state.selectedAgent.id;
    }

    addOrUpdateSynonym(submittedSynonym)
      .then(this.props.refresh)
      .then(this.setState({
        selected: undefined,
        selectedAgent: undefined,
        formattedSynonyms: [],
        selectedSynonym: undefined,
        newSynonym: false,
        prevSynonym: undefined
      }));
  }

  render() {
    let options = this.props.options;
    let { selected, selectedAgent, selectedSynonym } = this.state;
    let primary = selectedAgent ? selectedAgent.primarySynonym : null;

    const otherSynonyms = selectedAgent && selectedAgent.otherSynonyms.length ? (
      <div>
        <Synonyms synonyms={selectedAgent.otherSynonyms} />
      </div>
    ) : null;
    return (
      <div>
        <h3>Agent Synonyms</h3>
        <Select
          options={options}
          onChange={this.onAgentSelected}
          value={selected}
          placeholder="Search by species or common name"
          style={{ marginBottom: '15px' }}
        />
        {selectedAgent ? (
          <div>
            <ScientificName
              genus={primary.genus}
              species={primary.species}
              subSpecies={primary.subSpecies}
              authority={primary.authority}
            />
            {otherSynonyms}
            <button onClick={this.createSynonym}>{this.state.newSynonym ? 'UPDATE SYNONYM' : 'NEW SYNONYM'}</button>
            <TextInput title="Genus" value={selectedSynonym.genus} name="genus" onChange={this.onSynonymChange}/>
            <TextInput title="Species" value={selectedSynonym.species} name="species" onChange={this.onSynonymChange}/>
            <TextInput title="Sub-species" value={selectedSynonym.subSpecies} name="subSpecies" onChange={this.onSynonymChange}/>
            <TextInput title="Taxonomic authority" value={selectedSynonym.authority} name="authority" onChange={this.onSynonymChange}/>
            <RadioGroup title="Primary Synonym?"
              selected={selectedSynonym.isPrimary}
              name='isPrimary'
              options={BOOLEANS}
              disabled={this.state.selectedAgent.primarySynonym.id === this.state.selectedSynonym.id }
              onChange={this.onSynonymChange}
            />
            <TextArea title="Notes" value={selectedSynonym.notes} limit={65535} name="notes" onChange={this.onSynonymChange}/>
          </div>
        ) : null }
          <button onClick={this.submitSynonym}>SUBMIT</button>
      </div>
    );
  }
}

EditSynonyms.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array
};

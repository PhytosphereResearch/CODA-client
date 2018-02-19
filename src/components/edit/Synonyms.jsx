import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-virtualized-select';
import autobind from 'react-autobind';
import { ScientificName, Synonyms } from '../shared/partials';
import { RadioGroup, TextInput, TextArea } from '../shared/FormInputs';
import { getAgent, addOrUpdateSynonym } from '../../services/agents';
import { BOOLEANS } from './constants';

const blankSynonym = {
  genus: '',
  species: '',
  subSpecies: '',
  authority: '',
  isPrimary: false,
  notes: '',
};

const initialState = {
  selected: undefined,
  selectedAgent: undefined,
  formattedSynonyms: [],
  selectedSynonym: undefined,
  newSynonym: false,
  prevSynonym: undefined,
};

export default class EditSynonyms extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    autobind(this);
  }

  onAgentSelected(option) {
    if (!option || !option.value) {
      this.setState({ ...initialState });
      return;
    }
    getAgent(option.value)
      .then((agent) => {
        let selectedSynonym = agent.synonyms.find(synonym => synonym.id === option.synId);
        selectedSynonym = { ...selectedSynonym };
        this.setState({
          selectedAgent: agent, selectedSynonym, selected: option, newSynonym: false,
        });
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
    const updatedSynonym = { ...this.state.selectedSynonym, [e.target.name]: e.target.value };
    this.setState({ selectedSynonym: updatedSynonym });
  }

  onAgentChange(e) {
    const updatedAgent = { ...this.state.selectedAgent, [e.target.name]: e.target.value };
    this.setState({
      selectedAgent: updatedAgent,
    });
  }

  createSynonym() {
    if (this.state.newSynonym) {
      this.setState({ newSynonym: !this.state.newSynonym, selectedSynonym: { ...this.state.prevSynonym } });
    } else {
      const prevSynonym = { ...this.state.selectedSynonym };
      this.setState({ newSynonym: !this.state.newSynonym, selectedSynonym: { ...blankSynonym }, prevSynonym });
    }
  }

  submitSynonym() {
    const submittedSynonym = { ...this.state.selectedSynonym };
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
      .then(this.setState({ ...initialState }));
  }

  render() {
    const options = this.props.options;
    const { selected, selectedAgent, selectedSynonym } = this.state;
    const primary = selectedAgent ? selectedAgent.primarySynonym : null;

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
          placeholder="Type to search by species or common name"
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
            <TextInput title="Genus" value={selectedSynonym.genus} name="genus" onChange={this.onSynonymChange} />
            <TextInput title="Species" value={selectedSynonym.species} name="species" onChange={this.onSynonymChange} />
            <TextInput title="Sub-species" value={selectedSynonym.subSpecies} name="subSpecies" onChange={this.onSynonymChange} />
            <TextInput title="Taxonomic authority" value={selectedSynonym.authority} name="authority" onChange={this.onSynonymChange} />
            <RadioGroup
              title="Currently accepted name?"
              selected={selectedSynonym.isPrimary}
              name="isPrimary"
              options={BOOLEANS}
              disabled={this.state.selectedAgent.primarySynonym.id === this.state.selectedSynonym.id}
              onChange={this.onSynonymChange}
            />
            <TextArea title="Notes" value={selectedSynonym.notes} limit={65535} name="notes" onChange={this.onSynonymChange} />
          </div>
        ) : null }
        <button onClick={this.submitSynonym}>SUBMIT</button>
      </div>
    );
  }
}

EditSynonyms.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array,
};

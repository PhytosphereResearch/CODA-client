import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-virtualized-select';
import autobind from 'react-autobind';
import { getAgent } from '../../services/agents';
import { getOak } from '../../services/oaks';
import { getInteractionsByOakAndAgent } from '../../services/interactions';
import { TextInput, RadioGroup } from '../shared/FormInputs';
import { LIFE_STAGES, SITUATION, BOOLEANS } from './constants';
import HiSymptom from './HiSymptom';
import ButtonGroup from '../shared/ButtonGroup';

export default class EditInteractions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAgent: undefined,
      hiAgent: undefined,
      selectedOak: undefined,
      hiOak: undefined,
      hi: undefined,
    };
    autobind(this);
  }

  onAgentSelected(option) {
    if (!option || !option.value) {
      this.setState({ selectedAgent: undefined, hiAgent: undefined });
      return;
    }
    getAgent(option.value)
      .then(agent => this.setState({ selectedAgent: option, hiAgent: agent }));
  }

  onOakSelected(option) {
    if (!option || !option.value) {
      this.setState({ selectedOak: undefined, hiOak: undefined });
      return;
    }
    getOak(option.value)
      .then(oak => this.setState({ selectedOak: option, hiOak: oak }));
  }

  getHi() {
    const hiQuery = {};
    hiQuery.agentId = this.state.hiAgent.id;
    hiQuery.oakId = this.state.hiOak.id;
    getInteractionsByOakAndAgent(hiQuery)
      .then(interaction => this.setState({ hi: interaction }));
  }

  onInteractionSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { agents, oaks } = this.props;
    const { selectedAgent, selectedOak, hi } = this.state;
    return (
      <div>
        <h3>Host-Agent Interactions</h3>
        <h4>Find an agent</h4>
        <Select
          options={agents}
          onChange={this.onAgentSelected}
          value={selectedAgent}
          placeholder="Search by synonym"
          style={{ marginBottom: '15px' }}
        />
        <h4>Find an oak</h4>
        <Select
          options={oaks}
          onChange={this.onOakSelected}
          value={selectedOak}
          placeholder="Search by species or common name"
          style={{ marginBottom: '15px' }}
        />
        <button
          className="search-button"
          disabled={!(selectedAgent && selectedOak)}
          onClick={this.getHi}
        >
          Find my interaction!
        </button>
        { hi ? (
          <div>
            <RadioGroup title="Questionable" selected={hi.questionable} name="questionable" options={BOOLEANS} />
            <ButtonGroup title="Situation" selected={hi.situation} name="situation" options={SITUATION} />
            <ButtonGroup title="Host Life Stage" selected={hi.hostLifeStage} name="hostLifeStage" options={LIFE_STAGES} />
            <TextInput title="Notes" value={hi.notes} name="notes" />
            {/* TODO: Inputs for HI Range
               TODO: Inputs for HI References   */}
            {hi.hiSymptoms.map(symptom => <HiSymptom symptom={symptom} key={symptom.id} />)}
          </div>
      ) : null}
        {/* <button onClick={this.onInteractionSubmit}>SUBMIT</button> */}
      </div>
    );
  }
}

EditInteractions.propTypes = {
  oaks: PropTypes.array,
  agents: PropTypes.array,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import remove from 'lodash/remove';
import { getAgent } from '../../services/agents';
import { getOak } from '../../services/oaks';
import { getInteractionsByOakAndAgent, addOrUpdateHi } from '../../services/interactions';
import HiEntry from './HiEntry';

export default class EditInteractions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAgent: undefined,
      hiAgent: undefined,
      selectedOak: undefined,
      hiOak: undefined,
      hi: undefined,
      hiSymptoms: undefined,
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

  onInputChange(e) {
    const hi = { ...this.state.hi, [e.target.name]: e.target.value };
    this.setState({ hi });
  }

  onMultiInputChange(e) {
    const hi = { ...this.state.hi };
    const inputArray = hi[e.target.name];
    const { value } = e.target;
    if (inputArray.includes(value)) {
      const index = inputArray.indexOf(value);
      inputArray.splice(index, 1);
      this.setState({ ...this.state.hi, [e.target.name]: inputArray });
    } else {
      inputArray.push(value);
      this.setState({ ...this.state.hi, [e.target.name]: inputArray });
    }
  }

  onHisymptomMultiInputChange(e, id) {
    const hiSymptoms = [...this.state.hiSymptoms];
    const hiSymptToUpdate = hiSymptoms.find(hiSymptom => hiSymptom.id === id);
    const inputArray = hiSymptToUpdate[e.target.name];
    const { value } = e.target;

    if (inputArray.includes(value)) {
      remove(inputArray, element => element === value);
      this.setState({ hiSymptoms });
      return;
    }

    if (value === 'All' || value === 'Unknown' || value === '') {
      const symptArr = [];
      symptArr.push(value);
      hiSymptToUpdate[e.target.name] = symptArr;
      this.setState({ hiSymptoms });
      return;
    }

    remove(inputArray, element => element === 'All' || element === 'Unknown' || element === '');
    inputArray.push(value);
    this.setState({ hiSymptoms });
  }

  onHisymptomRadioChange(e, id) {
    const hiSymptoms = [...this.state.hiSymptoms];
    const hiSymptToUpdate = hiSymptoms.find(hiSymptom => hiSymptom.id === id);
    hiSymptToUpdate[e.target.name.split('&')[0]] = e.target.value;
    this.setState({ hiSymptoms });
  }

  onBibSelectChange(options) {
    const hi = { ...this.state.hi, bibs: options };
    this.setState({ hi });
  }

  onSubsiteSelectChange(id, options) {
    const hiSymptoms = [...this.state.hiSymptoms];
    const hiSymptToUpdate = hiSymptoms.find(hiSymptom => hiSymptom.id === id);
    hiSymptToUpdate.subSite = options;
    this.setState({ hiSymptoms });
  }

  onInteractionSubmit(e) {
    e.preventDefault();
  }


  onMapChange(county) {
    const hi = { ...this.state.hi };
    if (hi.countiesByRegions.includes(county)) {
      remove(hi.countiesByRegions, element => element === county);
      this.setState({ hi });
      return;
    }
    hi.countiesByRegions.push(county);
    this.setState({ hi });
  }


  onHiSubmit() {
    const hi = { ...this.state.hi };
    const hiSymptoms = { ...this.state.hiSymptoms };
    hi.hiSymptoms = hiSymptoms;
    addOrUpdateHi(hi)
      .then(() => this.setState({
        selectedAgent: undefined,
        hiAgent: undefined,
        selectedOak: undefined,
        hiOak: undefined,
        hi: undefined,
        hiSymptoms: undefined,
      }));
  }

  getHi() {
    const hiQuery = {};
    hiQuery.agentId = this.state.hiAgent.id;
    hiQuery.oakId = this.state.hiOak.id;
    getInteractionsByOakAndAgent(hiQuery)
      .then((interaction) => {
        interaction.countiesByRegions = interaction.countiesByRegions.map(c => c.countyCode);
        return interaction;
      })
      .then(interaction => this.setState({ hi: interaction, hiSymptoms: interaction.hiSymptoms }));
  }

  render() {
    const { agents, oaks, references } = this.props;
    const {
      selectedAgent, selectedOak, hi, hiSymptoms,
    } = this.state;
    const {
      onAgentSelected, onOakSelected, getHi, onInputChange,
      onMultiInputChange, onBibSelectChange, onSubsiteSelectChange, onHisymptomMultiInputChange,
      onHisymptomRadioChange, onMapChange, onHiSubmit,
    } = this;
    const entryProps = {
      agents,
      oaks,
      references,
      selectedAgent,
      selectedOak,
      hi,
      hiSymptoms,
      onAgentSelected,
      onOakSelected,
      getHi,
      onInputChange,
      onMultiInputChange,
      onBibSelectChange,
      onSubsiteSelectChange,
      onHisymptomMultiInputChange,
      onHisymptomRadioChange,
      onMapChange,
      onHiSubmit,
    };
    return (
      <HiEntry
        {...entryProps}
      />
    );
  }
}

EditInteractions.propTypes = {
  oaks: PropTypes.array,
  agents: PropTypes.array,
  references: PropTypes.array,
};

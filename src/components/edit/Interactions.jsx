import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import remove from 'lodash/remove';
import { getAgent } from '../../services/agents';
import { getOak } from '../../services/oaks';
import { getInteractionsByOakAndAgent, addOrUpdateHi } from '../../services/interactions';
import HiEntry from './HiEntry';
import { FullScreenSpinner } from '../shared/shapes';
import { PLANT_PARTS } from './constants';

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
      loading: false,
      searchPerformed: false,
      plantParts: [],
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

  onSymptomChange(id, options) {
    const hiSymptoms = [...this.state.hiSymptoms];
    const hiSymptToUpdate = hiSymptoms.find(hiSymptom => hiSymptom.id === id);
    hiSymptToUpdate.symptoms = options;
    this.setState({ hiSymptoms });
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
    this.setState({ loading: true });
    const hi = { ...this.state.hi };
    const hiSymptoms = { ...this.state.hiSymptoms };
    hi.bibs = hi.bibs.map(bib => bib.value);
    Object.keys(hiSymptoms).forEach((key) => {
      const symptom = hiSymptoms[key];
      symptom.isPrimary = symptom.isPrimary.join(';');
      symptom.maturity = symptom.maturity.join(';');
      symptom.subSite = symptom.subSite.map(subSite => subSite.label).join(';') || '';
    });
    hi.hiSymptoms = hiSymptoms;
    addOrUpdateHi(hi)
      .then(() => this.setState({
        selectedAgent: undefined,
        hiAgent: undefined,
        selectedOak: undefined,
        hiOak: undefined,
        hi: undefined,
        hiSymptoms: undefined,
        loading: false,
        searchPerformed: false,
      }))
      .catch(() => this.setState({ loading: false }));
  }

  addHiSymptom(e) {
    const plantPartToAdd = e.target.value;
    const hiSymptoms = [...this.state.hiSymptoms];
    const plantParts = [...this.state.plantParts];
    const baseHiSymptom = {
      hostInteractionId: this.state.hi.id,
      plantPart: plantPartToAdd,
      isIndirect: false,
      isPrimary: [''],
      maturity: [''],
      subSite: [],
      symptoms: [],
    };
    hiSymptoms.push(baseHiSymptom);
    remove(plantParts, plantPart => plantPart === plantPartToAdd);
    this.setState({ hiSymptoms, plantParts });
  }

  getHi() {
    this.setState({ loading: true });
    const hiQuery = {};
    hiQuery.agentId = this.state.hiAgent.id;
    hiQuery.oakId = this.state.hiOak.id;
    getInteractionsByOakAndAgent(hiQuery)
      .then((interaction) => {
        interaction.countiesByRegions = interaction.countiesByRegions.map(c => c.countyCode);
        interaction.hiSymptoms.forEach((hiSymptom) => {
          hiSymptom.subSite = hiSymptom.subSite.map(s => ({ label: s, value: s }));
        });
        const symptPlantParts = interaction.hiSymptoms.map(hiSymptom => hiSymptom.plantPart);
        const plantParts = PLANT_PARTS.filter(plantPart => !symptPlantParts.includes(plantPart));
        this.setState({
          hi: interaction, hiSymptoms: interaction.hiSymptoms, plantParts, loading: false, searchPerformed: true,
        });
      })
      .catch(() => this.setState({ loading: false, searchPerformed: true, hi: undefined }));
  }

  render() {
    const {
      agents, oaks, references, symptoms,
    } = this.props;
    const {
      selectedAgent, selectedOak, hi, hiSymptoms, plantParts, loading, searchPerformed,
    } = this.state;
    const {
      onAgentSelected, onOakSelected, getHi, onInputChange,
      onMultiInputChange, onBibSelectChange, onSubsiteSelectChange, onHisymptomMultiInputChange,
      onHisymptomRadioChange, onMapChange, onSymptomChange, onHiSubmit, addHiSymptom,
    } = this;
    const entryProps = {
      agents,
      oaks,
      references,
      symptoms,
      selectedAgent,
      selectedOak,
      hi,
      hiSymptoms,
      plantParts,
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
      onSymptomChange,
      onHiSubmit,
      addHiSymptom,
    };
    return (
      <div>
        { loading ? <FullScreenSpinner /> : <HiEntry {...entryProps} /> }
        { (searchPerformed && !hi) && <div><h3>No interaction between this host and this agent has been recored in CODA.</h3></div> }
      </div>
    );
  }
}

EditInteractions.propTypes = {
  oaks: PropTypes.array,
  agents: PropTypes.array,
  symptoms: PropTypes.array,
  references: PropTypes.array,
};

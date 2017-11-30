import React, { Component } from 'react';
import { BOOLEANS, BOOLEANARR, ECOLOGY } from './constants';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Select from 'react-virtualized-select';
import { getAgent/*addOrUpdateAgent*/ } from 'coda/services/agents';
import { TextInput, TextArea, RadioGroup, CustomToggle } from '../shared/FormInputs.jsx';
import ToggleButton from 'react-toggle-button';
import { FullScreenSpinner } from '../shared/shapes.jsx';
import pickBy from 'lodash.pickBy';
// torder: Sequelize.STRING,
// family: Sequelize.STRING,
// mostCommon: Sequelize.BOOLEAN,
// biotic: Sequelize.BOOLEAN,
// type: Sequelize.STRING,
// subType: Sequelize.STRING,
// subSubType: Sequelize.STRING,
// ecology: Sequelize.STRING,
// commonName: Sequelize.STRING,
// notes: Sequelize.BLOB
// TODO finish porting this form from angular >> react and connect it to the server!
let blankAgent = {
  genus: '',
  species: '',
  subSpecies: '',
  authority: '',
  torder: '',
  family: '',
  mostCommon: false,
  biotic: false,
  type: '',
  subType: '',
  subSubType: '',
  ecology: '',
  commonName: '',
  notes: ''
};

export default class EditAgents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedAgent: { ...blankAgent },
      newAgent: true
    };
    autobind(this);
  }

  onAgentSelected(option) {
    if (!option.value) {
      this.setState({ selected: null, selectedAgent: { ...blankAgent }, newAgent: true });
      return;
    }
    this.setState({ selected: option, newAgent: false });
    getAgent(option.value)
      .then(agent => this.setState({ selectedAgent: agent }));
  }

  onInputChange (e) {
    console.log(this.state.selectedAgent)
    console.log(e.target.value)
    let agent = { ...this.state.selectedAgent, [e.target.name]: e.target.value };
    this.setState({ selectedAgent: agent });
  }

  render() {
    let options = this.props.options;
    let { selected, selectedAgent } = this.state;
    return (
      <div>
        <h3>Agents</h3>
        <Select
          options={options}
          onChange={this.onAgentSelected}
          value={selected}
          placeholder="Search by species or common name"
          style={{ marginBottom: '15px' }}/>
        {
          this.state.newAgent
          ? <div style={{ display: 'flex' }}>
              <TextInput title="Genus" value={selectedAgent.genus} name="genus" onChange={this.onInputChange}/>
              <TextInput title="Species" value={selectedAgent.species} name="species" onChange={this.onInputChange}/>
              <TextInput title="Sub-species" value={selectedAgent.subSpecies} name="subSpecies" onChange={this.onInputChange}/>
              <TextInput title="Taxonomic authority" value={selectedAgent.authority} name="authority" onChange={this.onInputChange}/>
            </div>
          : null}
        {/* <!-- Current name: --> */}
        {/* <!-- <input type="text" value="{{agent.genus}} {{agent.species}}" DISABLED></input><br /> --> */}
        <TextInput title='Order' value={selectedAgent.torder} name="torder" onChange={this.onInputChange} />
        <TextInput title='Family' value={selectedAgent.family} name="family" onChange={this.onInputChange} />
        {/* <CustomToggle title='Most Common' name='mostCommon' onToggle={this.onInputChange} /> */}
        <RadioGroup title='Most Common' selected={selectedAgent.mostCommon} name='mostCommon' options={BOOLEANARR} onChange={this.onInputChange}/>
        <RadioGroup title='Biotic' selected={selectedAgent.biotic} name='biotic' options={BOOLEANARR} onChange={this.onInputChange}/>
        <TextInput title='Type' value={selectedAgent.type} name="type" onChange={this.onInputChange} />
        <TextInput title='Sub-type' value={selectedAgent.subType} name="subType" onChange={this.onInputChange} />
        <TextInput title='Sub sub-type' value={selectedAgent.subSubType} name="subSubType" onChange={this.onInputChange} />
        <RadioGroup title='Ecology' selected={selectedAgent.ecology} name='ecology' options={ECOLOGY} onChange={this.onInputChange} />
        <TextInput title='Common Name' value={selectedAgent.commonName} name="commonName" onChange={this.onInputChange} />
        <TextArea title="Notes" value={selectedAgent.notes} limit={65535} name="notes" onChange={this.onInputChange}/>
        <button onClick={() => console.log(selectedAgent)}>SUBMIT</button>
      </div>
    );
  }
}

EditAgents.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array
};

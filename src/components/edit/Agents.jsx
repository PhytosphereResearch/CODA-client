import React, { Component } from 'react';
import { BOOLEANS } from './constants';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Select from 'react-virtualized-select';
import { getAgent/*addOrUpdateAgent*/ } from 'coda/services/agents';
import { TextInput, TextArea } from '../shared/FormInputs.jsx';
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
  commonName: '',
  mostCommon: false,
  biotic: false,
  type: '',
  subType: '',
  subSubType: '',
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
    this.setState({ selected: option });
    getAgent(option.value)
      .then(agent => this.setState({ selectedAgent: agent }));
  }

  onInputChange (e) {
    console.log(e.target.value)
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
          : null/* If we're adding a new agent we need to create a primary synonym w/ the following fields:
        Genus:
        <input type="text" name="genus"></input><br />
        Species:
        <input type="text" name="species"></input><br />
        Sub-species:
        <input type="text" name="subSpecies"></input><br />
        Taxonomic authority:
        <input type="text" name="authority"></input><br /> */}
        {/* <!-- Current name: --> */}
        {/* <!-- <input type="text" value="{{agent.genus}} {{agent.species}}" DISABLED></input><br /> --> */}
        <TextInput title='Order' value='test' name="torder" onChange={this.onInputChange} />
        Family:
        <input type="text" name="family"></input><br />
        Most common?:
        {
          Object.keys(BOOLEANS).map((boolean) => {
            return (
              <span key={boolean}>
              <label>{boolean}
                <input name="mostCommon" type="radio" value={BOOLEANS[boolean]} required={true} />
              </label>
            </span>)
          })
}
        <br/>
        Biotic/abiotic?:
        {
          Object.keys(BOOLEANS).map((boolean) => {
            return (
             <span key={boolean}>
                 <label>{boolean}
                   <input name="biotic" type="radio" value={BOOLEANS[boolean]} required={true} />
                 </label>
               </span>)
          })
        }
        <br/>
        Type:
        <input type="text" name="type"></input><br />
        Sub-type:
        <input type="text" name="subType"></input><br />
        Sub sub-type:
        <input type="text" name="subSubType"></input><br />
        Ecology:
        <input type="text" name="ecology"></input><br />
        Common Name:
        <input type="text" name="commonName"></input><br />
        Notes:
        <textarea name="notes" id="notes"></textarea><br />
        <button onClick={() => console.log('submitted')}>SUBMIT</button>
      </div>
    );
  }
}

EditAgents.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array
};

import React, { Component } from 'react';
import { BOOLEANS } from './constants';
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
  subGenus: '',
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
      selectedAgent: { ...blankAgent }
    }
  }
  render() {
    return (
      <div>
        <h3>Agents</h3>
        {/* If we're adding a new agent we need to create a primary synonym w/ the following fields:
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
        Order:
        <input type="text" name="torder"></input><br />
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

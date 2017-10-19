import React, { Component } from 'react';

// TODO finish porting this form from angular >> react and connect it to the server!

export default class EditAgents extends Component {
  render() {
    return (
      <div>
        <h3>Agents</h3>
        Genus:
        <input type="text" name="genus"></input><br />
        Species:
        <input type="text" name="species"></input><br />
        Sub-species:
        <input type="text" name="subSpecies"></input><br />
        Taxonomic authority:
        <input type="text" name="authority"></input><br />
        {/* <!-- Current name: --> */}
        {/* <!-- <input type="text" value="{{agent.genus}} {{agent.species}}" DISABLED></input><br /> --> */}
        Order:
        <input type="text" name="torder"></input><br />
        Family:
        <input type="text" name="family"></input><br />
        Most common?:
        {/* <span ng-repeat="(key, value) in helpers.booleans">
          <label>{{key}}
          <input name="mostCommon" type="radio" name="mostCommon" value="{{value}}" required>
          </label>
        </span> */}
        <br/>
        Biotic/abiotic?:
        {/* <span ng-repeat="(key, value) in helpers.booleans">
          <label>{{key}}
          <input name="biotic" type="radio" name="biotic" value="{{value}}" required>
          </label>
        </span> */}
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

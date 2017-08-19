import React, { Component } from 'react';
// import { test } from 'coda/services/agents';

export default class EditOaks extends Component {
  render() {
    return (
      <div>
        <h3>Oaks</h3>
          Genus:
          <input type="text" name="genus"></input><br />
          Sub-genus:
          <input type="text" name="subGenus"></input><br />
          Species:
          <input type="text" name="species"></input><br />
          Sub-species:
          <input type="text" name="subSpecies"></input><br />
          Common Name:
          <input type="text" name="commonName"></input><br />
          Taxonomic authority:
          <input type="text" name="authority"></input><br />
          Evergreen?:
          <input type="text" name="evergreen"></input><br />
          Acorns:
          <input type="text" name="acorns"></input><br />
          Leaves:
          <input type="text" name="leaves"></input><br />
          Stems:
          <input type="text" name="stems"></input><br />
          Form:
          <input type="text" name="treeForm"></input><br />
          Height:
          <input type="text" name="height"></input><br />
          Distribution:
          <input type="text" name="distribution"></input><br />
          Hybrids:
          <input type="text" name="hybrids"></input><br />
          Varieties:
          <input type="text" name="varieties"></input><br />
          Notes:
          <textarea name="notes" id="notes"></textarea><br />
          <button onClick={() => console.log('submitted')}>SUBMIT</button>
      </div>
    );
  }
}

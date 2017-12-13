import React, { Component } from 'react';
import Select from 'react-virtualized-select';
import { getReferences } from 'coda/services/interactions';
// import { test } from 'coda/services/agents';

export default class EditReferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let { options } = this.props;
    return (
      <div>
        <h3>References</h3>
        <Select
          options={options}
          onChange={this.onRefSelected}
          value={selected}
          placeholder="Search by symptom"
          style={{ marginBottom: '15px' }}/>
          Form Goes Here
          <button onClick={() => console.log('submitted')}>SUBMIT</button>
      </div>
    );
  }
}


/* <h2>Edit a reference</h2>
Filter results: <input class="filter" type="text" ng-model="filter">
<div class="refList">
  <ul>
    <li ng-repeat="ref in allRefs | orderBy:'description' | filter:filter" ng-click="pickRef(ref.id)">{{ref.id}}. {{ref.description}}</li>
  </ul>
</div>


<form ng-submit="update()">
  ID:
  <input type="text" ng-model="thisRef.id" DISABLED></input><br />
  Year:
  <input type="text" ng-model="thisRef.year" placeholder="YYYY"></input><br />
  Description:
  <input type="text" ng-model="thisRef.description" placeholder="Authors (YYYY): short title"></input><br />
  Author:
  <input type="text" ng-model="thisRef.author"></input><br />
  Title:
  <input type="text" ng-model="thisRef.title"></input><br />
  Source:
  <input type="text" ng-model="thisRef.source"></input><br />
  Notes:
  <textarea ng-model="thisRef.notes" id="notes"></textarea><br />
  <button>SUBMIT</button>
</form> */

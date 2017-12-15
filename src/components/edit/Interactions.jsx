import React, { Component } from 'react';
import Select from 'react-virtualized-select';
import autobind from 'react-autobind';
import { getAgent } from 'coda/services/agents';
import { getOak } from 'coda/services/oaks';
import { getInteractionsByOakAndAgent } from 'coda/services/interactions';
import { TextInput, TextArea, RadioGroup } from '../shared/FormInputs.jsx';
import { LIFE_STAGES, SITUATION, BOOLEANS } from './constants';
// import { test } from 'coda/services/agents';

export default class EditInteractions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAgent: undefined,
      hiAgent: undefined,
      selectedOak: undefined,
      hiOak: undefined,
      hi: undefined
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
    let hiQuery = {};
    hiQuery.agentId = this.state.hiAgent.id;
    hiQuery.oakId = this.state.hiOak.id;
    console.log(hiQuery);
    getInteractionsByOakAndAgent(hiQuery)
      .then( interaction => this.setState({ hi: interaction }))
  }

  onInputChange (e) {
    let hi = { ...this.state.hi, [e.target.name]: e.target.value };
    this.setState({ hi: hi });
  }

  onInteractionSubmit(e) {
    e.preventDefault();
    console.log(this.state.hi);
  }

  render() {
    let { agents, oaks } = this.props;
    let { selectedAgent, hiAgent, selectedOak, hiOak, hi } = this.state;
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
          >Find my interaction!
        </button>
          { hi ? <form onChange={this.onInputChange}>
            <RadioGroup title='Questionable' selected={hi.questionable} name='questionable' options={BOOLEANS} />
            <RadioGroup title='Situation' selected={hi.situation} name='situation' options={SITUATION} />
            <RadioGroup title='Host Life Stage' selected={hi.hostLifeStage} name='hostLifeStage' options={LIFE_STAGES} />
            <TextInput title='Notes' value={hi.notes} name='notes' />
            {/* questionable: Sequelize.BOOLEAN,
situation: Sequelize.STRING,
hostLifeStage: Sequelize.STRING,
notes: Sequelize.BLOB */}
          <button onClick={this.onInteractionSubmit}>SUBMIT</button>
        </form> : null}
      </div>
    );
  }
}

/* <h2>Edit a host/agent interaction</h2>
<div class="narrow">
  <h3>Find an agent</h3>
  Filter results: <input class="filter" type="text" ng-model="filterAgents">
  <div class="refList">
    <ul>
      <li
        ng-repeat="synonym in allSynonyms | orderBy:'genus' | filter:filterAgents"
        ng-click="selectAgent(synonym)"
        ng-class="{inSearch: synonym.agentId === hi.agentId }"
      >
       {{synonym.id}}. <i>{{synonym.genus}} {{synonym.species}}</i>
     </li>
    </ul>
  </div>
</div>
<div class="narrow">
  <h3>Find an oak</h3>
  Filter results: <input class="filter" type="text" ng-model="filterOaks">
  <div class="refList">
    <ul>
      <img ng-if="!allOaks" src="../images/loading.gif" class="loading">
      <li
      ng-repeat="o in allOaks | orderBy:'species' | filter:filterOaks"
      ng-click="selectOak(o.id)"
      ng-class="{inSearch: o.id === hi.oakId }"
      >
        <i>{{o.genus}} {{o.species}}</i> {{o.subSpecies}}
        <div class="commonName" ng-if='o.commonName.length'>({{o.commonName}})</div>
      </li>
    </ul>
  </div>
</div>
<button class="search-button" ng-click="getHi()">Find my interaction!</button>
<div class="disabled">ID: {{hi.id}}</div>
<div class="disabled">Oak ID: {{hi.oakId}}</div>
<div class="disabled">Agent ID: {{hi.agentId}}</div>
<h3>References</h3>
<div>
  Filter results: <input class="filter" type="text" ng-model="filterRefs">
  <div class="refList">
    <ul>
      <li
        ng-repeat="ref in allRefs | orderBy:'description' | filter:filterRefs"
        ng-click="toggleSelection(ref, 'bibs')"
        ng-class="{inSearch: hi.bibs.indexOf(ref) !== -1}"
      >
        {{ref.id}}. {{ref.description}}
      </li>
    </ul>
  </div>
</div>
References:
<div class="placeholder" ng-if="!hi.bibs.length">select at least one reference</div>
<div ng-repeat="bib in hi.bibs">
  {{bib.id}}. {{bib.description}} <button class="delete-button warning" ng-click="toggleSelection(bib, 'bibs')">x</button>
</div>
Questionable ID or Record?:
<span ng-repeat="(key, value) in helpers.booleans">
  <label>{{key}}
    <input name="mostCommon" type="radio" ng-model="hi.questionable" value="{{value}}" required>
  </label>
</span>
<br>
  <div class="narrow">
    Range:
    <div edit-range-map my-data="hi.countiesByRegions"></div>
  </div>
  <div class="narrow">
    <div>
      Situation(s) where observed:
      <button
        class="button"
        ng-class="{inSearch: hi.situation.indexOf(situation) !== -1}"
        ng-click="toggleSelection(situation, 'situation')"
        ng-repeat="situation in situations"
      >
        {{situation}}
      </button>
    </div>
    <div>
      Host life stage(s):
      <button
        class="button"
        ng-class="{inSearch: hi.hostLifeStage.indexOf(lifeStage) !== -1}"
        ng-click="toggleSelection(lifeStage, 'hostLifeStage')"
        ng-repeat="lifeStage in lifeStages"
      >
        {{lifeStage}}
      </button>
    </div>
    Notes:
    <textarea ng-model="hi.notes" id="notes"></textarea><br />
    <button ng-click="submit()">SUBMIT</button>
  </div> */

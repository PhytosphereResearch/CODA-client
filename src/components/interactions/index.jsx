import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Select from 'react-select';
import { getInteractions } from 'coda/services/interactions';
import SearchResult from './SearchResult.jsx';
const plantParts = ['acorn', 'branch', 'leaf', 'trunk', 'flower', 'root'];


export default class Interactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      interactions: []
    };
    autobind(this);
  }

  onSelect(option, key) {
    let { selected } = this.state;
    if(key === 'plantPart' && selected.symptom && !selected.symptom[option]) {
      selected.symptom = undefined;
    }
    selected[key] = option;
    this.setState({ selected });
  }

  canSearch() {
    let { symptom, oak } = this.state.selected;
    return (symptom && symptom.value) || (oak && oak.value);
  }

  onSearchClick() {
    this.setState({ searching: true, interactions: [] });
    let { selected } = this.state;
    let symptomId = selected.symptom ? selected.symptom.value : '';
    let oakId = selected.oak ? selected.oak.value : '';
    getInteractions(selected.plantPart, symptomId, oakId)
    .then(interactions => {
      this.setState({ searching: false, interactions });
    });
    this.context.router.history.push(`/hi?symptom=${symptomId}&oak=${oakId}&part=${selected.plantPart}`);
  }

  render() {
    let { oaks, symptoms } = this.props;
    let { selected, searching, interactions } = this.state;
    return (
      <div>
        <h2>Find a Host/Agent Interaction</h2>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <h4>Host Oak</h4>
            <Select
              options={oaks}
              onChange={(option) => this.onSelect(option, 'oak')}
              value={selected.oak}
              placeholder="Select an oak"
              style={{ marginBottom: "15px" }}
            />
            <h4>Symptom</h4>
            <div style={{ marginBottom: "15px", display: "flex" }}>
              {plantParts.map(part => (
                <button
                  style={{ flexGrow: "1" }}
                  className={selected.plantPart === part ? 'inSearch' : ''}
                  onClick={() => this.onSelect(part, 'plantPart')}
                  key={part}>
                  {part}
                </button>)
              )}
            </div>
            <Select
              disabled={!selected.plantPart}
              options={symptoms.filter(symptom => symptom[selected.plantPart])}
              onChange={(option) => this.onSelect(option, 'symptom')}
              value={selected.symptom}
              placeholder="Select a symptom"
              style={{ marginBottom: "15px" }}
            />
          </div>
        </div>
        <button
          disabled={!this.canSearch()}
          className="search-button"
          onClick={this.onSearchClick}>
          Search this combination
        </button>
        <div className="interactionsList">
          { searching ? 'searching...' : '' }
          { !searching && !interactions.length ? 'No results found' : ''}
          <ul>
            { interactions.map(interaction => <SearchResult key={interaction.id} interaction={interaction} />) }
          </ul>
        </div>
      </div>
    );
  }
}

Interactions.propTypes = {
  oaks: PropTypes.array,
  symptoms: PropTypes.array
};

Interactions.contextTypes = {
  router: PropTypes.object
};

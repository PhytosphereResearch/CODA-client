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

  onSelected(option, key) {
    let { selected } = this.state
    if(key === 'plantPart') {
      if (this.state.selected.symptom && !this.state.selected.symptom[option]) {
        selected.symptom = undefined;
      }
    }
    selected[key] = option
    this.setState({ selected });
  }

  canSearch() {
    let { plantPart, symptom, oak } = this.state.selected;
    return plantPart && symptom && symptom.value && oak && oak.value;
  }

  onSearchClick() {
    if (!this.canSearch()) {
      return;
    }
    this.setState({ searching: true });
    let { selected } = this.state;
    getInteractions(selected.plantPart, selected.symptom.value, selected.oak.value)
    .then(interactions => {
      this.setState({ searching: false, interactions });
    });
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
              onChange={(option) => this.onSelected(option, 'oak')}
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
                  onClick={() => this.onSelected(part, 'plantPart')}
                  key={part}>
                  {part}
                </button>)
              )}
            </div>
            <Select
              disabed={!selected.plantPart}
              options={symptoms.filter(symptom => symptom[selected.plantPart])}
              onChange={(option) => this.onSelected(option, 'symptom')}
              value={selected.symptom}
              placeholder="Select a symptom"
              style={{ marginBottom: "15px" }}
            />
            <button
              disabled={!this.canSearch()}
              className="search-button"
              onClick={this.onSearchClick}>
             Search this combination
            </button>
          </div>
        </div>
        <div className="interactionsList">
          { searching ? 'searching...' : '' }
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

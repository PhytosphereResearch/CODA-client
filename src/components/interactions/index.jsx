import React, { Component } from 'react';
import autobind from 'react-autobind';
import Select from 'react-select';

const plantParts = ['acorn', 'branch', 'leaf', 'trunk', 'flower', 'root'];

export default class Interactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
    autobind(this);
  }

  onSelected(option, key) {
    this.setState({ selected: { ...this.state.selected, [key]: option } });
  }

  render() {
    let { oaks, symptoms } = this.props
    let { selected } = this.state
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
              options={symptoms}
              onChange={(option) => this.onSelected(option, 'symptom')}
              value={selected.symptom}
              placeholder="Select a symptom"
              style={{ marginBottom: "15px" }}
            />
            <button className="search-button">Search this combination</button>
          </div>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

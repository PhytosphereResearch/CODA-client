import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Select from 'react-virtualized-select';
import { getInteractions } from 'coda/services/interactions';
import SearchResult from './SearchResult.jsx';
import { withRouter } from 'react-router';
import SymptomPreview from './SymptomPreview.jsx';
import { Spinner } from '../shared/shapes.jsx';

const plantParts = ['flower', 'acorn', 'leaf', 'branch', 'trunk', 'root'];

class Interactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      interactions: []
    };
    autobind(this);
  }

  componentWillMount() {
    if (this.props.location.search) {
      this.goSearch(this.props.location.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.goSearch(nextProps.location.search);
    }
  }

  goSearch(query) {
    if (!query) {
      return;
    }
    let search = {};
    query.replace('?', '')
      .split('&')
      .map(pair => pair.split('='))
      .forEach(pair => search[pair[0]] = pair[1].split('@'));
    let oak = search.oak[0] ? { value: search.oak[0], label: decodeURI(search.oak[1]) } : undefined;
    let symptom = search.symptom[0] ? { value: search.symptom[0], label: decodeURI(search.symptom[1]) } : undefined;
    let selected = { ...this.state.selected, plantPart: search.plantPart[0], oak, symptom };
    this.setState({ searching: true, selected, interactions: [] });
    getInteractions(search.plantPart[0], search.symptom[0], search.oak[0])
    .then(interactions => {
      this.setState({
        searching: false,
        interactions });
    });
  }

  onSelect(option, key) {
    let { selected } = this.state;
    if (key === 'plantPart' && selected.symptom && !selected.symptom[option]) {
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
    let { selected } = this.state;
    let symptom = selected.symptom ? `${selected.symptom.value}@${selected.symptom.label}` : '';
    let oak = selected.oak ? `${selected.oak.value}@${selected.oak.label}` : '';
    let options = { symptom, oak, plantPart: selected.plantPart };
    let query = Object.keys(options).map(key => `${key}=${options[key]}`).join('&');
    this.context.router.history.push(`/hi?${query}`);
  }

  render() {
    let { oaks, symptoms } = this.props;
    let { selected, searching, interactions } = this.state;
    return (
      <div>
        <h2>Find an agent by symptoms</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: '50%' }}>
            <h4 style={{ marginBottom: '0' }}>Select your oak</h4>
            <div style={{ paddingBottom: '20px' }}>
              <small> or leave blank to search all oaks</small>
            </div>
            <Select
              options={oaks}
              onChange={(option) => this.onSelect(option, 'oak')}
              value={selected.oak}
              placeholder="Search oaks by species or common name"
              style={{ marginBottom: '15px' }}
            />
            <h4>Symptom location</h4>
            <div style={{ marginBottom: '15px', display: 'flex' }}>
              {plantParts.map(part => (
                <button
                  style={{ flexGrow: '1' }}
                  className={selected.plantPart === part ? 'inSearch' : ''}
                  onClick={() => this.onSelect(part, 'plantPart')}
                  key={part}>
                  {part}
                </button>)
              )}
            </div>
            <h4>Symptom</h4>
            <Select
              disabled={!selected.plantPart}
              options={symptoms.filter(symptom => symptom[selected.plantPart])}
              onChange={(option) => this.onSelect(option, 'symptom')}
              value={selected.symptom}
              placeholder="Select a symptom"
              style={{ marginBottom: '15px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '1' }}>
            <SymptomPreview
              plantPart={selected.plantPart}
              symptom={selected.symptom}
            />
          </div>
        </div>
        <div className="go-search">
          <button
            disabled={!this.canSearch()}
            className="search-button"
            onClick={this.onSearchClick}>
            Search this combination
          </button>
        </div>
        <div className="interactionsList">
          { searching ? <Spinner /> : null }
          { !searching && !interactions.length && this.props.location.search ? (
            <div style={{ textAlign: 'center' }}><h3>No Results Found</h3><h4>Try modifying your search</h4></div>
          ) : null }
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
  symptoms: PropTypes.array,
  location: PropTypes.object
};

Interactions.contextTypes = {
  router: PropTypes.object
};

export default withRouter(Interactions);

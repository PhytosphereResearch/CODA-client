import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScientificName, CommonName, Synonyms, CalPhotos, Notes } from '../shared/partials.jsx';
import RangeMap from '../shared/RangeMap.jsx';
import { getAgent } from 'coda/services/agents';

export default class Agent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    getAgent(this.props.match.params.id)
      .then(agent => this.setState({ agent }));
  }

  componentWillReceiveProps(nextProps) {
    // don't reload the agent we just loaded
    if (this.props.match.params.id === nextProps.match.params.id) {
      return;
    }
    getAgent(nextProps.match.params.id)
      .then(agent => this.setState({ agent }));
  }

  render() {
    let { agent } = this.state;

    if (!agent) {
      return null;
    }

    let hosts = (
      <div>
        <b>Hosts: </b>
        {agent.hosts.map((h, index) => (
          <span key={index + h.species}><i>{h.genus} {h.species}{h.subSpecies ? ' ' : ''}{h.subSpecies}</i>{index < agent.hosts.length-  1 ? ', ' : ''}</span>
        ))}
      </div>
    );

    return (
      <div>
        <ScientificName genus={agent.primarySynonym.genus} species={agent.primarySynonym.species} authority={agent.primarySynonym.authority} />
        { agent.commonName ?  <CommonName commonName={agent.commonName} /> : null }
        <br />
        <div className="details">
          <Synonyms synonyms={agent.otherSynonyms} />
          <div className="taxonomy">
            <p>{agent.type}: {agent.subType}</p>
            <p> {agent.subSubType}</p>
            <span><b>Order: </b>{agent.torder} <br /></span>
            <span><b>Family: </b>{agent.family} <br /></span>
          </div>
         {hosts}
          <CalPhotos genus={agent.primarySynonym.genus} species={agent.primarySynonym.species} />
          { agent.notes ? <Notes notes={agent.notes} /> : null }
        </div>
          <div className="range">
            <div ><b>Reported range</b> <br />
              <RangeMap range={agent.rangeData} />
            </div>
          </div>
        </div>
    );
  }
}

Agent.propTypes = {
  match: PropTypes.object
};

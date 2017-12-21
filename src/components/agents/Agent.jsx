import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { ScientificName, CommonName, Synonyms, CalPhotos, Notes, AgentTaxonomy } from '../shared/partials';
import RangeMap from '../shared/RangeMap';
import { getAgent } from '../../services/agents';
import { Spinner } from '../shared/shapes';

export default class Agent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    autobind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    getAgent(this.props.match.params.id)
      .then(agent => this.setState({ agent, loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    // don't reload the agent we just loaded
    if (this.props.match.params.id === nextProps.match.params.id) {
      return;
    }
    getAgent(nextProps.match.params.id)
      .then(agent => this.setState({ agent }));
  }

  goToHostInteraction(e) {
    const interactionId = e.target.getAttribute('data-interaction');
    this.context.router.history.push(`/hi/interaction/${interactionId}`);
  }

  render() {
    const { agent, loading } = this.state;
    if (!agent && !loading) {
      return null;
    } else if (loading) {
      return <Spinner />;
    }

    const hosts = (
      <div>
        <b>Hosts: </b>
        {agent.hosts.map((h, index) => (
          <span key={h.genus + h.species}>
            <a style={{ cursor: 'pointer' }} onClick={this.goToHostInteraction}>
              <i data-interaction={h.interactionId}>
                {h.genus} {h.species}{h.subSpecies ? ' ' : ''}{h.subSpecies}
              </i>
            </a>
            {index < agent.hosts.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
    );

    return (
      <div>
        <ScientificName genus={agent.primarySynonym.genus} species={agent.primarySynonym.species} subSpecies={agent.primarySynonym.subSpecies} authority={agent.primarySynonym.authority} />
        <div style={{ clear: 'both' }}>
          {/* <div style={{ flex: '1' }}> */}
          <div style={{ float: 'right' }}><b>Reported range</b> <br />
            <RangeMap range={agent.rangeData} />
          </div>
          <p />
          { agent.commonName ? <CommonName commonName={agent.commonName} /> : null }
          <CalPhotos genus={agent.primarySynonym.genus} species={agent.primarySynonym.species} />
          <p />
          <Synonyms synonyms={agent.otherSynonyms} />
          <p />
          {agent.synonyms.map(synonym => (synonym.notes ? <div>{synonym.notes}</div> : null))}
          <p />
          <AgentTaxonomy agent={agent} />
          <p />
          {hosts}
          <p />
          { agent.notes ? <Notes notes={agent.notes} /> : null }
        </div>
      </div>
    );
  }
}

Agent.propTypes = {
  match: PropTypes.object,
};

Agent.contextTypes = {
  router: PropTypes.object,
};

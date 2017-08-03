import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScientificName, CommonName, Notes } from '../shared/partials.jsx';
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
    console.log(agent)
    if (!agent) {
      return null;
    }
    let synonyms = (
      <div>
        <b>Other synonyms:</b>
        <ul className="synonyms">
            {agent.otherSynonyms.map(s => (
              <li key={s.genus + s.species + s.authority}>
                <i>{s.genus} {s.species} {s.subSpecies}</i> {s.authority}
              </li>
            ))}
        </ul>
      </div>
    );

    return (
      <div>
        <ScientificName genus={agent.primarySynonym.genus} species={agent.primarySynonym.species} authority={agent.primarySynonym.authority} />
        { agent.commonName ?  <CommonName commonName={agent.commonName} /> : null }
        <br />
        <div className="details">
        { agent.otherSynonyms.length ? synonyms : null }
        <div className="taxonomy">
          <p>{agent.type}: {agent.subType}</p>
          <p> {agent.subSubType}</p>
          <span><b>Order: </b>{agent.torder} <br /></span>
          <span><b>Family: </b>{agent.family} <br /></span>
        </div>
          <br />
          {/* <div><b>Hosts: </b><span ng-repeat="h in agent.hosts"><i>{h.genus} {h.species}<span ng-if="h.subSpecies"> {h.subSpecies}</span></i><span ng-if="!$last">, </span></span></div> */}
          <br />
          <b>Images:</b>
          <a href={`http://calphotos.berkeley.edu/cgi/img_query?where-taxon=${agent.primarySynonym.genus}+${agent.primarySynonym.species}`} target="_blank">Search CalPhotos</a>
          { agent.notes ? <Notes notes={agent.notes} /> : null }
        </div>
          <div className="range">
            <div ><b>Reported range</b> <br />
              {/* <range-map></range-map> */}
            </div>
          </div>
        </div>
    );
  }
}

Agent.propTypes = {
  match: PropTypes.object
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getInteraction } from '../../services/interactions';
import RangeMap from '../shared/RangeMap';
import { Spinner } from '../shared/shapes';
import { ScientificName, CommonName, AgentTaxonomy, Synonyms, Notes, CalPhotos } from '../shared/partials';
import Reference from './Reference';
import Symptom from './Symptom';

export default class InteractionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interaction: {},
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    getInteraction(this.props.match.params.id)
      .then(interaction => this.setState({ interaction, loading: false }));
  }

  render() {
    const { interaction } = this.state;
    const { oak, agent } = interaction;
    console.log(interaction)
    if (this.state.loading) {
      return <Spinner />;
    }

    const directSymptoms = interaction.directSymptoms.length ? (
      <div>
        <h3>Symptoms at or near the site of attack:</h3>
        <ul>
          {interaction.directSymptoms.map(symptom => <Symptom key={symptom.id} symptom={symptom} />)}
        </ul>
      </div>
    ) : null;

    const indirectSymptoms = interaction.indirectSymptoms.length ? (
      <div>
        <h3>Symptoms found away from site of attack:</h3>
        <ul>
          {interaction.indirectSymptoms.map(symptom => <Symptom key={symptom.id} symptom={symptom} />)}
        </ul>
      </div>
    ) : null;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          {/* Range map */}
          <div style={{ float: 'right' }}>
            <h3>Reported agent range</h3>
            <RangeMap interactionRange={interaction.range} range={interaction.agentRange} />
          </div>
          {/* Data on this interaction */}
          <div>
            <h3>
              Host:{' '}
              <Link to={`/oaks/${oak.id}`}>
                <ScientificName inline genus={oak.genus} species={oak.species} subSpecies={oak.subSpecies} authority={oak.authority} />
              </Link>
            </h3>
            <p />
            {oak.commonName && <CommonName commonName={oak.commonName} />}
          </div>
          <div>
            <b>Host life stage(s) affected:</b> {interaction.hostLifeStage}
          </div>
          <div>
            <h3>
              Agent:{' '}
              <Link to={`/agents/${agent.id}`}>
                <ScientificName inline genus={agent.genus} species={agent.species} subSpecies={agent.subSpecies} authority={agent.authority} />
              </Link>
            </h3>
            <p />
            {agent.commonName && <CommonName commonName={agent.commonName} />}
            <CalPhotos genus={agent.genus} species={agent.species} />
            <p />
            <AgentTaxonomy agent={agent} />
            <p />
            <Synonyms synonyms={agent.synonyms} />
          </div>
          {interaction.questionable ? <div className="cite-details"> Questionable ID </div> : null }
          <p />
          {directSymptoms}
          {indirectSymptoms}
          {interaction.notes ? <Notes notes={interaction.notes} /> : null }
          <h3>References: <small>(click to expand)</small></h3>
          {interaction.bibs.map(cite => <Reference key={cite.id} cite={cite} />)}
        </div>
      </div>
    );
  }
}

InteractionPage.propTypes = {
  match: PropTypes.object,
};

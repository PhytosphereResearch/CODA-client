import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getInteraction } from 'coda/services/interactions';
import RangeMap from 'coda/components/shared/RangeMap.jsx';
import { ScientificName, CommonName, AgentTaxonomy, Synonyms, Notes, CalPhotos } from 'coda/components/shared/partials.jsx';
import Reference from './Reference.jsx';

export default class InteractionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interaction: {},
      loading: false
    };
  }

  componentWillMount () {
    this.setState({ loading: true });
    getInteraction(this.props.match.params.id)
      .then(interaction => this.setState({ interaction, loading: false }));
  }

  render() {
    let { interaction } = this.state;
    let { oak, agent } = interaction;
    if(this.state.loading) {
      return <div>Loading...</div>;
    }
    console.log(interaction);
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          {/* Data on this interaction */}
          <div>
            <h3>Host:</h3>
            <Link to={`/oaks/${oak.id}`}>
              <ScientificName genus={oak.genus} species={oak.species} subSpecies={oak.subSpecies} authority={oak.authority} />
            </Link>
            {oak.commonName && <CommonName commonName={oak.commonName} />}
          </div>
          <div className="cite-details">
            Life stage(s) affected: {interaction.hostLifeStage}
          </div>
          <div>
            <h3>Agent:</h3>
            <Link to={`/agents/${agent.id}`}>
              <ScientificName genus={agent.genus} species={agent.species} subSpecies={agent.subSpecies} authority={agent.authority} />
            </Link>
            {agent.commonName && <CommonName commonName={agent.commonName} />}
            <Synonyms synonyms={agent.synonyms} />
            <AgentTaxonomy agent={agent} />
            <CalPhotos genus={agent.genus} species={agent.species} />
          </div>
          {interaction.questionable ? <div className="cite-details"> Questionable ID </div> : null }
          {interaction.notes ? <Notes notes={interaction.notes} /> : null }
          <h3>References:</h3>
          {interaction.bibs.map(cite => <Reference key={cite.id} cite={cite} /> )}
        </div>
        <div>
          {/* Range map */}
          <div className="range mini">
            <div>
              <h5>Reported agent range</h5>
              <RangeMap range={interaction.range} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InteractionPage.propTypes = {
  interaction: PropTypes.object,
  match: PropTypes.object
};


{/* <div ng-if="hi.directSymptoms.length" class="direct">
  <b>Symptoms at or near the site of attack:</b>
  <br />
  <ul>
    <li ng-repeat="s in hi.directSymptoms">
      <b>{{s.plantPart | uppercase}}</b>
      &rarr;
      <b><span ng-repeat="symp in s.symptoms"><span ng-if="$index != 0">;</span> {{symp.symptom}}</span></b>
      <br>
      <span ng-if="s.maturity.toLowerCase() != 'all'">Affects {{s.maturity | lowercase}} {{s.subSite | lowercase}} </span><span ng-if="!s.subSite && s.maturity.toLowerCase() != 'all'">tissue</span>
      <span ng-if="!s.subSite && s.maturity.toLowerCase() == 'all'">All tissue maturities affected</span>
    </li>
  </ul>
</div>
<div class="indirect" ng-if="hi.indirectSymptoms.length">
  <b>Symptoms found away from site of attack:</b>
  <br />
  <ul>
    <li ng-repeat="s in hi.indirectSymptoms">
      <b>{{s.plantPart | uppercase}}</b>
      &rarr; <b><span ng-repeat="symp in s.symptoms"><span ng-if="$index != 0">;</span> {{symp.symptom}}</span></b>
      <br>
      <span ng-if="s.maturity.toLowerCase() != 'all'">Affects {{s.maturity | lowercase}} {{s.subSite | lowercase}} </span><span ng-if="!s.subSite && s.maturity.toLowerCase() != 'all'">tissue</span>
      <span ng-if="!s.subSite && s.maturity.toLowerCase() == 'all'">All tissue maturities affected</span>
    </li>
  </ul>
</div> */}

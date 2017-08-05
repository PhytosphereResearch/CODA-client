import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchResult extends Component {
  render() {
    let { interaction } = this.props;
    let { agent } = interaction.hostInteraction;
    let description;
    if (interaction.maturity !== "all") {
      description = <span>affects {interaction.maturity} {interaction.subsite || "tissue"} </span>;
    }

    return (
        <li>
          <div className="searchResult">
            <div className="record-details">
              <b>{agent.subType} &mdash; </b>
              <i>{agent.synonyms[0].genus} {agent.synonyms[0].species}</i> {agent.synonyms[0].authority} {agent.commonName && <span>&mdash; {agent.commonName}</span>}
              <br />
              {interaction.plantPart}: {description}
            </div>
            <button>Read more</button>
          </div>
        </li>
    );
  }
}

SearchResult.propTypes = {
  interaction: PropTypes.object
};

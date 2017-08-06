import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

export default class SearchResult extends Component {

  constructor(props) {
    super(props);
    autobind(this);
  }

  onRecordClick() {
    this.context.router.history.push(`/hi/interaction/${this.props.interaction.hostInteractionId}`);
  }

  render() {
    let { interaction } = this.props;
    let { agent } = interaction.hostInteraction;
    let description;
    if (interaction.maturity !== "all") {
      description = <span>: affects {interaction.maturity} {interaction.subSite || "tissue"} </span>;
    }


    return (
        <li>
          <div className="searchResult">
            <div className="record-details">
              <b>{agent.subType} &mdash; </b>
              <i>{agent.synonyms[0].genus} {agent.synonyms[0].species}</i> {agent.synonyms[0].authority} {agent.commonName && <span>&mdash; {agent.commonName}</span>}
              <br />
              {interaction.plantPart}{description}
            </div>
            <button onClick={this.onRecordClick}>Read more</button>
          </div>
        </li>
    );
  }
}

SearchResult.propTypes = {
  interaction: PropTypes.object
};

SearchResult.contextTypes = {
  router: PropTypes.object
};

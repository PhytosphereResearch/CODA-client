import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { ScientificName } from '../shared/partials';

const SearchResult = (props) => {
  const navigate = useNavigate();
  const onRecordClick = () => {
    navigate(`/hi/interaction/${props.interaction.hostInteractionId}`);
  };

  const { interaction } = props;
  const { agent, oak } = interaction.hostInteraction;
  let description;
  if (interaction.maturity !== 'all') {
    description = (
      <span>
        : affects {interaction.maturity} {interaction.subSite || 'tissue'}{' '}
      </span>
    );
  }

  return (
    <li>
      <div className="searchResult">
        <div className="record-details">
          <b>{agent.subType} &mdash; </b>
          <i>
            {agent.synonyms[0].genus} {agent.synonyms[0].species}
          </i>{' '}
          {agent.synonyms[0].authority}{' '}
          {agent.commonName && <span>&mdash; {agent.commonName}</span>}
          <br />
          {<b>Oak &mdash;</b>}{' '}
          <ScientificName
            style={{ fontSize: '11pt' }}
            genus={oak.genus}
            species={oak.species}
            subSpecies={oak.subSpecies}
            authority={oak.authority}
            inline
          />{' '}
          &mdash; {interaction.plantPart}
          {description}
        </div>
        <button onClick={onRecordClick}>Read more</button>
      </div>
    </li>
  );
};

SearchResult.propTypes = {
  interaction: PropTypes.object,
};

export default SearchResult;

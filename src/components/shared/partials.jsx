import React from 'react';
import PropTypes from 'prop-types';

export const ScientificName = ({ genus, species, subSpecies, authority, inline, style }) =>
  <div style={{ ...style, display: inline ? 'inline-block' : 'block' }} className="scientific-name">
    <i>{genus} {species} {subSpecies}</i> <span className="authority">{authority}</span>
  </div>;

ScientificName.propTypes = {
  genus: PropTypes.string,
  species: PropTypes.string,
  subSpecies: PropTypes.string,
  authority: PropTypes.string,
  inline: PropTypes.bool,
  style: PropTypes.object
};

export const CommonName = ({ commonName }) =>
  <div>
    <b>Common name(s):</b> {commonName}
  </div>;

CommonName.propTypes = {
  commonName: PropTypes.string
};

export const CalPhotos = ({ genus, species }) =>
  <div>
    <b>Images:</b>{' '}
    <a href={`http://calphotos.berkeley.edu/cgi/img_query?where-taxon=${genus}+${species}`} target="_blank">Search CalPhotos</a>
  </div>;

CalPhotos.propTypes = {
  genus: PropTypes.string,
  species: PropTypes.string
};

export const AgentTaxonomy = ({ agent }) =>
  <div className="taxonomy">
    <div><b>Taxonomy: {agent.type} &mdash; {agent.subType} {agent.subSubType ? <span>&mdash; {agent.subSubType}</span> : ''}</b></div>
    <div style={{ marginLeft: '10px' }}>
      {agent.torder ? <span><b>Order: </b>{agent.torder} <br /></span> : null}
      <span><b>Family: </b>{agent.family} <br /></span>
    </div>
  </div>;

AgentTaxonomy.propTypes = {
  agent: PropTypes.object
};

export const Notes = ({ notes }) =>
  <div>
    <b>Notes:</b> {notes}
  </div>;

Notes.propTypes = {
  notes: PropTypes.string
};

export const Synonyms = ({ synonyms }) =>
  synonyms.length ?
  <div>
    <b>Synonyms:</b>
    <ul className="synonyms">
      {synonyms.map(s => (
        <li style={{ paddingLeft: '10px' }} key={s.genus + s.species + s.authority}>
          <i>{s.genus} {s.species} {s.subSpecies}</i> {s.authority}
        </li>
      ))}
    </ul>
  </div> : null;

Synonyms.propTypes = {
  synonyms: PropTypes.array
};

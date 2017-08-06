import React from 'react';
import PropTypes from 'prop-types';

export const ScientificName = ({ genus, species, subSpecies, authority }) =>
  <div className="scientific-name">
    <i>{genus} {species}</i> {subSpecies} <span className="authority">{authority}</span>
  </div>;

ScientificName.propTypes = {
  genus: PropTypes.string,
  species: PropTypes.string,
  subSpecies: PropTypes.string,
  authority: PropTypes.string
};

export const CommonName = ({ commonName }) =>
  <p>
    <b>Common name(s):</b> {commonName}
  </p>;

CommonName.propTypes = {
  commonName: PropTypes.string
};

export const CalPhotos = ({ genus, species }) =>
  <div>
    <b>Images:</b>{" "}
    <a href={`http://calphotos.berkeley.edu/cgi/img_query?where-taxon=${genus}+${species}`} target="_blank">Search CalPhotos</a>
  </div>;

CalPhotos.propTypes = {
  genus: PropTypes.string,
  species: PropTypes.string
};

export const AgentTaxonomy = ({ agent }) =>
  <div className="taxonomy">
    <p>{agent.type}: {agent.subType}</p>
    <p>{agent.subSubType}</p>
    <span><b>Order: </b>{agent.torder} <br /></span>
    <span><b>Family: </b>{agent.family} <br /></span>
  </div>;

AgentTaxonomy.propTypes = {
  agent: PropTypes.object
};

export const Notes = ({ notes }) =>
  <div>
    <p><b>Notes:</b></p>
    <p>{notes}</p>
  </div>;

Notes.propTypes = {
  notes: PropTypes.string
};

export const Synonyms = ({ synonyms }) =>
  synonyms.length ?
  <div>
    <b>Other synonyms:</b>
    <ul className="synonyms">
      {synonyms.map(s => (
        <li key={s.genus + s.species + s.authority}>
          <i>{s.genus} {s.species} {s.subSpecies}</i> {s.authority}
        </li>
      ))}
    </ul>
  </div> : null;

Synonyms.propTypes = {
  synonyms: PropTypes.array
};

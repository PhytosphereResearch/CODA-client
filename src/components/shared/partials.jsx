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

export const Notes = ({ notes }) =>
  <div>
    <p><b>Notes:</b></p>
    <p>{notes}</p>
  </div>;

Notes.propTypes = {
  notes: PropTypes.string
};

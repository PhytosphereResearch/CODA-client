import React from 'react';
import PropTypes from 'prop-types';

const Symptom = ({ symptom }) => {
  const symptoms = symptom.symptoms.map(s => s.symptom).join('; ');
  const allMaturities = symptom.maturity.toLowerCase() === 'all';
  let message;
  if (!allMaturities) {
    message = `Affects ${symptom.maturity.replace(/;/i, '; ').toLowerCase()} ${symptom.subSite.replace(/;/i, '; ').toLowerCase() || 'tissue'}`;
  } else {
    message = 'All tissue maturities affected';
  }
  return (
    <li>
      <b>{symptom.plantPart.toUpperCase()}</b>
        &rarr; <b>{symptoms}</b>
      <div>
        { message }
      </div>
    </li>
  );
};

Symptom.propTypes = {
  symptom: PropTypes.object,
};

export default Symptom;

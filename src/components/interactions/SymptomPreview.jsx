import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const defaultStyle = {
  height: '300px',
  width: '300px',
  maxWidth: '100%',
  maxHeight: '100%',
  border: '1px solid lightgrey',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const SymptomPreview = (props) => {
  const [hasError, setHasError] = useState(false);

  const { plantPart, symptom, description, style } = props;

  useEffect(() => {
    setHasError(false);
  }, [plantPart, symptom]);

  const handleError = () => {
    setHasError(true);
  };

  if (!plantPart || !symptom) {
    return (
      <div style={{ ...defaultStyle, ...style, textAlign: 'center' }}>
        <h4>An image of the selected symptom will appear here</h4>
      </div>
    );
  }

  const image = hasError ? (
    <div style={defaultStyle}>
      <h4>No image available</h4>
    </div>
  ) : (
    <img
      style={{ maxWidth: '100%' }}
      src={`/images/symptoms/${plantPart}/${symptom.label.replace(/ /g, '_')}.jpg`}
      alt={`${symptom.label} on ${plantPart}`}
      onError={() => handleError()}
    />
  );

  return (
    <div style={{ ...style }}>
      {image}
      <p style={{ maxWidth: '300px' }}>{description || symptom.description}</p>
    </div>
  );
};

SymptomPreview.propTypes = {
  plantPart: PropTypes.string,
  symptom: PropTypes.object,
  description: PropTypes.string,
  style: PropTypes.object,
};

export default SymptomPreview;

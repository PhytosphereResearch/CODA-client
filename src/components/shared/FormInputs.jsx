import React from 'react';
import PropTypes from 'prop-types';

export const TextInput = ({ title, name, limit, value, onChange }) => {
  return (
    <div style={{ padding: '5px 0', width: '100%' }}>
      <div className="field-label">
        {title}:
      </div>
      <input type="text" maxLength={limit || 255} style={{ width: '100%' }} name={name} value={value || ''} onChange={onChange}/>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  limit: PropTypes.number,
  onChange: PropTypes.func
};

export const TextArea = ({ title, name, value, onChange, limit }) => {
  return (
    <div style={{ padding: '5px 0' }}>
      <div className="field-label">
        {title}:
      </div>
      <textarea type="text" maxLength={limit || 255} style={{ width: '100%' }} name={name} value={value || ''} onChange={onChange}/>
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  limit: PropTypes.number,
  onChange: PropTypes.func
};

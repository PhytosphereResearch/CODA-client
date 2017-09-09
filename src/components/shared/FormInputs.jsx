import React from 'react';
import PropTypes from 'prop-types';

export const TextInput = ({ title, name, value, onChange }) => {
  return (
    <div style={{ padding: '5px 0' }}>
      {title}:
      <input type="text" name={name} value={value || ''} onChange={onChange}/>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export const TextArea = ({ title, name, value, onChange }) => {
  return (
    <div style={{ padding: '5px 0' }}>
      <div>
        {title}:
      </div>
      <textarea type="text" name={name} value={value || ''} onChange={onChange}/>
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button';

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

export const Checkbox = ({ title, name, isChecked }) => {
  return (
    <span style={{ marginRight: '15px' }}>
      <input type="checkbox" name={name} checked={isChecked}/> <span className="field-label">{title}</span>
    </span>
  );
};

Checkbox.propTypes = {
  title: PropTypes.string,
  isChecked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export const RadioGroup = ({ title, options, name, onChange }) => {
  return (
  <div className="radio-group">
    <div className="field-label">{title}:</div>
    <ul>
      {options.map((option, index) => {
        return (
        <li key={title + index}>
          <input type="radio" id={title + option} value={option} name={name} onChange={onChange}/>
          <label htmlFor={title + option}>{option}</label>

          <div className="check">
          </div>
        </li>);
      })}
    </ul>
  </div>
)
}

RadioGroup.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export const CustomToggle = ({ title, name, onToggle }) => {
  return (
    <div className="toggle" name={name}>
      <div className="field-label">{title}:</div>
      <ToggleButton
        value={false}
        onToggle={onToggle}
        activeLabel="true"
        inactiveLabel="false"
      />
    </div>
  )
}

CustomToggle.propTypes = {
  title: PropTypes.string,
  onToggle: PropTypes.func
};

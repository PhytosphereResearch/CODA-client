import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Creatable } from 'react-select';

export const TextInput = ({
  title, name, limit, value, onChange, placeholder = '',
}) => (
  <div style={{ padding: '5px 0', width: '100%' }}>
    <div className="field-label">
      {title}:
    </div>
    <input
      type="text"
      maxLength={limit || 255}
      placeholder={placeholder}
      style={{ width: '100%' }}
      name={name}
      value={value || ''}
      onChange={onChange}
    />
  </div>
);

TextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  limit: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export const TextArea = ({
  title, name, value, onChange, limit,
}) => (
  <div style={{ padding: '5px 0' }}>
    <div className="field-label">
      {title}:
    </div>
    <textarea type="text" maxLength={limit || 255} style={{ width: '100%' }} name={name} value={value || ''} onChange={onChange} />
  </div>
);

TextArea.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  limit: PropTypes.number,
  onChange: PropTypes.func,
};

export const Checkbox = ({ title, name, isChecked }) => (
  <span style={{ marginRight: '15px' }}>
    <input type="checkbox" name={name} checked={isChecked} /> <span className="field-label">{title}</span>
  </span>
);

Checkbox.propTypes = {
  title: PropTypes.string,
  isChecked: PropTypes.bool,
  name: PropTypes.string,
};

export const RadioGroup = ({
  title, options, name, selected, onChange, disabled,
}) => (
  <div className={disabled ? 'radio-group disabled' : 'radio-group'}>
    <div className="field-label">{title}:</div>
    <ul>
      {options.map((option) => {
        const uniqueId = `${title}-${option}-${Math.floor(Math.random() * 0xffff)}`;
        return (
          <li key={uniqueId}>
            <input
              type="radio"
              id={uniqueId}
              value={option}
              name={name}
              checked={selected.toString() === option.toString()}
              onChange={onChange}
              required
              disabled={disabled}
            />
            <label htmlFor={uniqueId}>{option.toString()}</label>
            <div className="check" />
          </li>);
      })}
    </ul>
  </div>
);

RadioGroup.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export class EnhancedCreatable extends Component {
  constructor(props) {
    super(props);
    this.createOption = this.createOption.bind(this);
  }

  createOption(option) {
    return { label: option.label, value: option.label, field: this.props.name };
  }

  render() {
    return (
      <div className="creatable">
        <div className="field-label">
          {this.props.title}:
        </div>
        <Creatable
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          newOptionCreator={this.createOption}
          options={this.props.options}
          multi={this.props.multi || false}
        />
      </div>
    );
  }
}

EnhancedCreatable.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  multi: PropTypes.bool,
};

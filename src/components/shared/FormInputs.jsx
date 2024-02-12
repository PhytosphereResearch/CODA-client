import React from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';

export const TextInput = ({
  title, name, limit, value, onChange, placeholder, hintText = '',
}) => (
  <div style={{ padding: '5px 0', width: '100%' }}>
    <div className="field-label">
      {title}:
    </div>
    {hintText ? <div className="text-muted">{hintText}</div> : null}
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
  hintText: PropTypes.string,
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

export const RadioGroup = (props) => {
  const onChange = (e) => {
    if (props.disabled) {
      return;
    }
    const event = {
      target: {
        name: e.target.name || e.target.dataset.name,
        value: e.target.value || e.target.dataset.value,
      },
    };
    props.onChange(event);
  }

    const {
      title, options, name, selected, disabled,
    } = props;
    return (
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
                <div className={ disabled ? "check disabled" : "check" } data-name={name} data-value={option} onClick={onChange} />
              </li>);
          })}
        </ul>
      </div>
    );
}

RadioGroup.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export const EnhancedCreatable = (props) => {
   const createOption = (option) => {
    return { label: option.label, value: option.label, field: props.name };
  }

  const { name, value, onChange, options, multi, title } = props;

    return (
      <div className="creatable">
        <div className="field-label">
          {title}:
        </div>
        <Creatable
          name={name}
          value={value}
          onChange={onChange}
          newOptionCreator={createOption}
          options={options}
          multi={multi || false}
        />
      </div>
    );
}

EnhancedCreatable.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  options: PropTypes.array,
  multi: PropTypes.bool,
};

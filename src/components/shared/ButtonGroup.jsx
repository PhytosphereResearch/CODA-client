import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const ButtonGroup = ({ title, name, options, selected, onClick }) => {
  return (
    <div>
      <div className="field-label">{title}:</div>
      {options.map(option => (
        <button
          onClick={onClick}
          name={name}
          className={selected.includes(option) ? 'selected' : ''}
          value={option}
          key={`${option}-${Math.floor(Math.random() * 0xffff)}`}
          >{option}
        </button>
      )
    )}
    </div>
  )
}

ButtonGroup.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.array,
  onClick: PropTypes.func
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import autobind from 'react-autobind';
import Oak from './Oak.jsx';

import 'react-select/dist/react-select.css';

export default class Oaks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedOak: undefined
    };
    autobind(this);
  }

  onOakSelected(option) {
    let selectedOak = this.props.oaks.find(o => o.id === option.value);
    this.setState({ selected: option, selectedOak });
  }

  render() {
    let { selectedOak, selected } = this.state;
    let { options } = this.props;
    return (
      <div>
        <h2>Find an oak</h2>
        <Select
          options={options}
          onChange={(option) => this.onOakSelected(option)}
          value={selected}
          placeholder="Search by species or common name"
        />
        { selectedOak ? <Oak oak={selectedOak}/> : null }
      </div>
    );
  }
}

Oaks.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })),
  oaks: PropTypes.arrayOf(PropTypes.object)
};

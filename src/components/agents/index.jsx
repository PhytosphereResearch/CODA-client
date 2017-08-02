import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import autobind from 'react-autobind';
// import Oak from './Oak.jsx';

import 'react-select/dist/react-select.css';

export default class Agents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
    autobind(this);
  }

  onAgentSelected(option) {
    // let selectedOak = this.props.oaks.find(o => o.id === option.value);
    this.setState({ selected: option });
  }

  render() {
    let { selected } = this.state;
    let { options } = this.props;
    return (
      <div>
        <h2>Find an Agent</h2>
        <Select
          options={options}
          onChange={(option) => this.onAgentSelected(option)}
          value={selected}
          placeholder="Search by species or common name"
        />
        {/* { selectedOak ? <Oak oak={selectedOak}/> : null } */}
      </div>
    );
  }
}

Agents.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })),
  agents: PropTypes.arrayOf(PropTypes.object)
};

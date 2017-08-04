import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Switch, Route } from 'react-router-dom';
import autobind from 'react-autobind';
import Agent from './Agent.jsx';

import 'react-select/dist/react-select.css';

export default class Agents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selectedAgent: undefined
    };
    autobind(this);
  }

  onAgentSelected(option) {
    this.setState({ selected: option });
    option.value ? this.context.router.history.push(`/agents/${option.value}`) : this.context.router.history.push('/agents');
  }

  render() {
    let { selected } = this.state;
    let { options } = this.props;

    return (
      <div>
        <h2>Find an Agent</h2>
        <Select
          options={options}
          onChange={this.onAgentSelected}
          value={selected}
          placeholder="Search by species or common name"
          style={{ marginBottom: "15px" }}
        />
        <Switch>
          <Route path="/agents/:id" component={Agent} />
        </Switch>
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

Agents.contextTypes = {
  router: PropTypes.object
};

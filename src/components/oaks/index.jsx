import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Switch, Route } from 'react-router-dom';
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
    this.setState({ selected: option });
    option.value ? this.context.router.history.push(`/oaks/${option.value}`) : this.context.router.history.push('/oaks');
  }

  render() {
    let { selected } = this.state;
    let { options } = this.props;
    return (
      <div>
        <h2>Find an oak</h2>
        <Select
          options={options}
          onChange={this.onOakSelected}
          value={selected}
          placeholder="Search by species or common name"
          style={{ marginBottom: '15px' }}
        />
        <Switch>
          <Route path="/oaks/:id" component={Oak} />
        </Switch>
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

Oaks.contextTypes = {
  router: PropTypes.object
};

import React, { Component } from 'react';
import { getAllOaks } from 'coda/services/oaks';
import Select from 'react-select';
import autobind from 'react-autobind';

import 'react-select/dist/react-select.css';

export default class Oaks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oaks: [],
      formattedOaks: [],
      selected: undefined,
      selectedOak: {}
    };
    autobind(this);
  }

  componentWillMount() {
    getAllOaks().then(oaks => {
      let formattedOaks = oaks.map(o => ({ value: o.id, label: `${o.genus} ${o.species} ${o.commonName? `(${o.commonName})` : ''}` }));
      this.setState({ oaks, formattedOaks });
    });
  }

  onOakSelected(option) {
    let selectedOak = this.state.oaks.find(o => o.id === option.value);
    this.setState({ selected: option, selectedOak });
  }

  render() {
    let { formattedOaks, selectedOak, selected } = this.state;
    return (
      <div>
        <h4>This will be the oaks page</h4>
        <Select
          options={formattedOaks}
          onChange={(option) => this.onOakSelected(option)}
          value={selected}
        />

        <h4>You have selected {selectedOak.genus} {selectedOak.species}</h4>
      </div>
    );
  }
}

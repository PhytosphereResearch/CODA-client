import React, { Component } from "react";
import { getAllOaks } from 'coda/services/oaks';

export default class Oaks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oaks: []
    };
  }

  componentWillMount() {
    getAllOaks().then(oaks => this.setState({ oaks }));
  }

  render() {
    return (
      <div>
        <h4>This will be the oaks page</h4>
        {this.state.oaks.length ? this.state.oaks.map(oak => <div key={oak.id}>{oak.genus} {oak.species}</div>) : null}
      </div>
    );
  }
}

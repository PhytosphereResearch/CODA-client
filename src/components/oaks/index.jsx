import React, { Component } from "react";
import { getAllOaks } from 'coda/services/oaks';

export default class Oaks extends Component {
  componentWillMount() {
    getAllOaks();
  }
  render() {
    return (
      <div>
        This will be the oaks page
      </div>
    );
  }
}

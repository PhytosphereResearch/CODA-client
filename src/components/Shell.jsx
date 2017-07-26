import React, { Component } from "react";
import Header from "./header.jsx"

export default class Shell extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

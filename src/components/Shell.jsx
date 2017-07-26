import React, { Component } from "react";
import Header from "./header.jsx"
import Footer from "./footer.jsx"

export default class Shell extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

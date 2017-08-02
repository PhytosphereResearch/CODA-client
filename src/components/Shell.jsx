import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./header.jsx";
import Footer from "./footer.jsx";

export default class Shell extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ margin: "0 30px 30px", minHeight: "calc(100vh - 180px)" }}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

Shell.propTypes = {
  children: PropTypes.node
};

import React, { Component } from 'react';
import autobind from 'react-autobind';
import Legal from './landing/Legal';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    autobind(this);
  }

  displayStatement() {
    this.setState({ show: true });
  }

  handleCloseModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div className="copyright">
        <Legal show={this.state.show} handleCloseModal={this.handleCloseModal} />
        <a onClick={this.displayStatement}>
          © 2016 Phytosphere Research | Version 2.0 | Disclaimer | Nondiscrimination statement
        </a>
      </div>
    );
  }
}

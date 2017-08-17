import React, { Component } from 'react';
import autobind from 'react-autobind';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
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
        <a onClick={this.displayStatement}>© 2016 Phytosphere Research | Version 2.0 | Disclaimer | Nondiscrimination statement</a>
      </div>
    );
  }
}

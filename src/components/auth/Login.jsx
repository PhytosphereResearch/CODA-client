import React, { Component } from 'react';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Login extends Component {
  componentWillMount() {
    if (this.props.auth.isAuthenticated()) {
      return;
    }
    this.props.auth.login();
  }

  render() {
    return this.props.auth.isAuthenticated() ? redirect("/") : null;
  }
}

Login.propTypes = {
  auth: PropTypes.object,
};

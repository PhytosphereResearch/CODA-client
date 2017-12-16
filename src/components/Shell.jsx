import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

export default class Shell extends Component {
  render() {
    return (
      <div>
        <Header loggedIn={this.props.auth.isAuthenticated()} />
        <div style={{
 margin: '0 auto', padding: '0 30px', minHeight: 'calc(100vh - 180px)', maxWidth: '1200px',
}}
        >
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

Shell.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object,
};

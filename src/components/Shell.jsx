import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './header.jsx';
import Footer from './footer.jsx';

export default class Shell extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile, isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      return;
    }
    if (!userProfile) {
      getProfile((err, profile) => {
        console.log(profile)
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.auth.isAuthenticated()}/>
        <div style={{ margin: '0 auto', padding: '0 30px', minHeight: 'calc(100vh - 180px)', maxWidth: '1200px' }}>
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

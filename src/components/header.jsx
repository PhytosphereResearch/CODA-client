import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import autobind from 'react-autobind';
import Logo from './logo.jsx';

class Header extends Component {

  constructor(props) {
    super(props);
    autobind(this);
  }

  computeMatch(string) {
    return this.props.location.pathname.split('/')[1] === string;
  }

  render () {
    return (
      <div className="group">
        <div className="header group">
          <div className="title">
            <div className="logo"><Logo /></div>
            <div className="subtitle">California Oak Disease and Arthropod Database</div>
          </div>
          <nav className="navigation">
            <ul>
              <li className={this.computeMatch('') ? 'active' : ''}><Link to="/">Home</Link></li>
              <li className={this.computeMatch('oaks') ? 'active' : ''}><Link to="/oaks">Oaks</Link></li>
              <li className={this.computeMatch('agents') ? 'active' : ''}><Link to="/agents">Agents</Link></li>
              <li className={this.computeMatch('hi') ? 'active' : ''}><Link to="/hi">Interactions</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

const WrappedHeader = withRouter(Header);
export default WrappedHeader;

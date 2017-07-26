import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.jsx';

export default class Header extends Component {
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
              <li className={this.props.active ? "active" : ""}><Link to="default">Home</Link></li>
              <li className={this.props.active ? "active" : ""}><Link to="oaks">Oaks</Link></li>
              <li className={this.props.active ? "active" : ""}><Link to="agents">Agents</Link></li>
              <li className={this.props.active ? "active" : ""}><Link to="hi">Interactions</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

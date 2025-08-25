import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from './logo';

const Header = (props) => {
  const location = useLocation();

  const computeMatch = (string) => {
    return location.pathname.split('/')[1] === string;
  };

  return (
    <div className="group">
      <div className="header group">
        <div className="title">
          <div className="logo">
            <Logo />
          </div>
          <div className="subtitle">
            California Oak Disease and Arthropod Database
          </div>
        </div>
        <nav className="navigation">
          <ul>
            {props.loggedIn && (
              <li className={computeMatch('edit') ? 'active' : ''}>
                <Link to="/edit">Edit</Link>
              </li>
            )}
            <li className={computeMatch('') ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={computeMatch('oaks') ? 'active' : ''}>
              <Link to="/oaks">Oaks</Link>
            </li>
            <li className={computeMatch('agents') ? 'active' : ''}>
              <Link to="/agents">Agents</Link>
            </li>
            <li className={computeMatch('hi') ? 'active' : ''}>
              <Link to="/hi">Interactions</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  loggedIn: PropTypes.bool,
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';

const Edit = () => {
  return (
    <div>
      <h2>Edit CODA</h2>
      <ul className="home-links">
        <li><Link to="/edit/oaks">Oaks</Link></li>
        <li><Link to="/edit/agents">Agents</Link></li>
        <li><Link to="/edit/synonyms">Synonyms</Link></li>
        <li><Link to="/edit/symptoms">Symptoms</Link></li>
        <li><Link to="/edit/references">References</Link></li>
        <li><Link to="/edit/interactions">Interactions</Link></li>
      </ul>
      <Outlet />
    </div>
  );
};

Edit.propTypes = {
  formattedOaks: PropTypes.array,
  fetchOaks: PropTypes.func,
  fetchAgents: PropTypes.func,
  formattedAgents: PropTypes.array,
  formattedSymptoms: PropTypes.array,
  fetchSymptoms: PropTypes.func,
  formattedReferences: PropTypes.array,
  fetchReferences: PropTypes.func,
};

export default Edit;

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Edit = () => {
  return (
    <div>
      <h2>Edit CODA</h2>
     <b>To reset any page you are editing without saving, click to a different page, i.e. to reset Agents, click to Oaks and then back to Agents </b>
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

export default Edit;

import React from 'react';
import PropTypes from 'prop-types';
import { Link, Routes, Route } from 'react-router-dom';
import EditOaks from './Oaks';
import EditAgents from './Agents';
import EditSynonyms from './Synonyms';
import EditSymptoms from './Symptoms';
import EditReferences from './References';
import EditInteractions from './Interactions';

const Edit = (props) => {
  const {
    formattedOaks, fetchOaks, formattedAgents, fetchAgents, formattedSymptoms, fetchSymptoms, formattedReferences, fetchReferences,
  } = props;
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
      <Routes>
        <Route path="/edit/oaks" render={() => <EditOaks options={formattedOaks} refresh={fetchOaks} />} />
        <Route path="/edit/agents" render={() => <EditAgents options={formattedAgents} refresh={fetchAgents} />} />
        <Route path="/edit/synonyms" render={() => <EditSynonyms options={formattedAgents} refresh={fetchAgents} />} />
        <Route path="/edit/symptoms" render={() => <EditSymptoms options={formattedSymptoms} refresh={fetchSymptoms} />} />
        <Route path="/edit/references" render={() => <EditReferences options={formattedReferences} refresh={fetchReferences} />} />
        <Route path="/edit/interactions" render={() => <EditInteractions agents={formattedAgents} oaks={formattedOaks} references={formattedReferences} symptoms={formattedSymptoms} />} />
      </Routes>
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

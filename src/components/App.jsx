import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import Shell from './Shell';
import Landing from './landing';
import Agents from './agents';
import Oaks from './oaks';
import Edit from './edit';
import InteractionSearch from './interactions';
import InteractionPage from './interactions/InteractionPage';
import { getAllOaks } from '../services/oaks';
import { getAllAgentSynonyms } from '../services/agents';
import { getAllSymptoms, getReferences } from '../services/interactions';
import Auth from './auth/Auth';
import Login from './auth/Login';
import Callback from './auth/Callback';
import Oak from './oaks/Oak';
import Agent from './agents/Agent';
import EditOaks from './edit/Oaks';
import EditAgents from './edit/Agents';
import EditSynonyms from './edit/Synonyms';
import EditSymptoms from './edit/Symptoms';
import EditReferences from './edit/References';
import EditInteractions from './edit/Interactions';

const format = (records, idField = 'id') => records.map(r => ({ value: r[idField], label: `${r.genus} ${r.species} ${r.subSpecies} ${r.commonName ? `(${r.commonName})` : ''}`, synId: r.id ? r.id : null }));

export const auth = new Auth();

const App = () => {
  const [oaks, setOaks] = useState([]);
  const [formattedOaks, setFormattedOaks] = useState([]);
  const [agents, setAgents] = useState([]);
  const [formattedAgents, setFormattedAgents] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [formattedSymptoms, setFormattedSymptoms] = useState([]);
  const [formattedReferences, setFormattedReferences] = useState([]);

  useEffect(() => {
    fetchOaks();
    fetchAgents();
    fetchSymptoms();
    fetchReferences();
  }, [])

  const fetchSymptoms = () => {
    getAllSymptoms().then((symptoms) => {
      const formattedSymptoms = symptoms.map(s => ({ ...s, value: s.id, label: s.symptom }));
      setSymptoms(symptoms);
      setFormattedSymptoms(formattedSymptoms);
    });
  }

  const fetchOaks = () => {
    return getAllOaks().then((oaks) => {
      const formattedOaks = format(oaks);
      setOaks(oaks);
      setFormattedOaks(formattedOaks);
    });
  }

  const fetchAgents = () => {
    return getAllAgentSynonyms().then((agents) => {
      const formattedAgents = format(agents, 'agentId');
      setAgents(agents);
      setFormattedAgents(formattedAgents);
    });
  }

  const fetchReferences = () => {
    return getReferences().then((references) => {
      const formatted = references.map(r => ({ ...r, value: r.id, label: r.description }));
      setFormattedReferences(formatted);
    });
  }

    return (
      <div>
        <Router>
          <Shell auth={auth}>
            <Routes>
              <Route exact path="/" Component={Landing} />
              <Route path="/oaks" element={<Oaks oaks={oaks} options={formattedOaks} />}>
                  <Route path="/oaks/:id" element={<Oak />} />
              </Route>
              <Route path="/agents" element={<Agents agents={agents} options={formattedAgents} />}>
                  <Route path="/agents/:id" element={<Agent/>} />
              </Route>
              <Route path="/hi/interaction/:id" element={<InteractionPage />} />
              <Route path="/hi" element={<InteractionSearch oaks={formattedOaks} symptoms={formattedSymptoms} />} />
              <Route path="/login" element={<Login auth={auth} />} />
              <Route path="/edit" element={(auth.isAuthenticated() ? <Edit oaks={oaks} formattedOaks={formattedOaks} agents={agents} formattedAgents={formattedAgents} symptoms={symptoms} formattedSymptoms={formattedSymptoms} formattedReferences={formattedReferences} fetchAgents={fetchAgents} fetchOaks={fetchOaks} fetchSymptoms={fetchSymptoms} fetchReferences={fetchReferences} /> : <Navigate to='/' replace/>)}>
                  <Route path="/edit/oaks" element={<EditOaks options={formattedOaks} refresh={fetchOaks} />} />
                  <Route path="/edit/agents" element={<EditAgents options={formattedAgents} refresh={fetchAgents} />} />
                  <Route path="/edit/synonyms" element={<EditSynonyms options={formattedAgents} refresh={fetchAgents} />} />
                  <Route path="/edit/symptoms" element={<EditSymptoms options={formattedSymptoms} refresh={fetchSymptoms} />} />
                  <Route path="/edit/references" element={<EditReferences options={formattedReferences} refresh={fetchReferences} />} />
                  <Route path="/edit/interactions" element={<EditInteractions agents={formattedAgents} oaks={formattedOaks} references={formattedReferences} symptoms={formattedSymptoms} />} />
              </Route>
              <Route
                path="/callback"
                element={<Callback />}
              />
            </Routes>
          </Shell>
        </Router>
      </div>
    );
}

export default App;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import { Navigate } from 'react-router';
import autobind from 'react-autobind';
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

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oaks: [],
      formattedOaks: [],
      agents: [],
      formattedAgents: [],
      symptoms: [],
      formattedSymptoms: [],
      formattedReferences: [],
    };
    autobind(this);
  }

  componentWillMount() {
    this.fetchOaks();
    this.fetchAgents();
    this.fetchSymptoms();
    this.fetchReferences();
  }

  fetchSymptoms() {
    getAllSymptoms().then((symptoms) => {
      const formattedSymptoms = symptoms.map(s => ({ ...s, value: s.id, label: s.symptom }));
      this.setState({ symptoms, formattedSymptoms });
    });
  }

  fetchOaks() {
    return getAllOaks().then((oaks) => {
      const formattedOaks = format(oaks);
      this.setState({ oaks, formattedOaks });
    });
  }

  fetchAgents() {
    return getAllAgentSynonyms().then((agents) => {
      const formattedAgents = format(agents, 'agentId');
      this.setState({ agents, formattedAgents });
    });
  }

  fetchReferences() {
    return getReferences().then((references) => {
      const formatted = references.map(r => ({ ...r, value: r.id, label: r.description }));
      this.setState({ formattedReferences: formatted });
    });
  }

  render() {
    const { formattedOaks, formattedAgents, formattedSymptoms, formattedReferences } = this.state;
    return (
      <div>
        <Router>
          <Shell auth={auth}>
            <Routes>
              <Route exact path="/" Component={Landing} />
              <Route path="/oaks" element={<Oaks oaks={this.state.oaks} options={this.state.formattedOaks} />}>
                  <Route path="/oaks/:id" element={<Oak />} />
              </Route>
              <Route path="/agents" element={<Agents agents={this.state.agents} options={this.state.formattedAgents} />}>
                  <Route path="/agents/:id" element={<Agent/>} />
              </Route>
              <Route path="/hi/interaction/:id" element={<InteractionPage />} />
              <Route path="/hi" element={<InteractionSearch oaks={this.state.formattedOaks} symptoms={this.state.formattedSymptoms} />} />
              <Route path="/login" element={<Login auth={auth} />} />
              <Route path="/edit" element={(auth.isAuthenticated() ? <Edit {...this.state} fetchAgents={this.fetchAgents} fetchOaks={this.fetchOaks} fetchSymptoms={this.fetchSymptoms} fetchReferences={this.fetchReferences} /> : <Navigate to='/' replace/>)}>
                  <Route path="/edit/oaks" element={<EditOaks options={formattedOaks} refresh={this.fetchOaks} />} />
                  <Route path="/edit/agents" element={<EditAgents options={formattedAgents} refresh={this.fetchAgents} />} />
                  <Route path="/edit/synonyms" element={<EditSynonyms options={formattedAgents} refresh={this.fetchAgents} />} />
                  <Route path="/edit/symptoms" element={<EditSymptoms options={formattedSymptoms} refresh={this.fetchSymptoms} />} />
                  <Route path="/edit/references" element={<EditReferences options={formattedReferences} refresh={this.fetchReferences} />} />
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

  //   <Routes>

  // </Routes>
  }
}

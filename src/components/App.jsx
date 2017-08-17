import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shell from './Shell.jsx';
import Landing from './landing/index.jsx';
import Agents from './agents/index.jsx';
import Oaks from './oaks/index.jsx';
import InteractionSearch from './interactions/index.jsx';
import InteractionPage from './interactions/InteractionPage.jsx';
import { getAllOaks } from 'coda/services/oaks';
import { getAllAgentSynonyms } from 'coda/services/agents';
import { getAllSymptoms } from 'coda/services/interactions';
import Auth from './auth/Auth';
import Login from './auth/Login';
import Callback from './auth/Callback.jsx';

const format = (records, idField = 'id') => records.map(r => ({ value: r[idField], label: `${r.genus} ${r.species} ${r.subSpecies} ${r.commonName ? `(${r.commonName})` : ''}` }));

const auth = new Auth();

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
      formattedSymptoms: []
    };
  }

  componentWillMount() {
    getAllOaks().then(oaks => {
      let formattedOaks = format(oaks);
      this.setState({ oaks, formattedOaks });
    });
    getAllAgentSynonyms().then(agents => {
      let formattedAgents = format(agents, 'agentId');
      this.setState({ agents, formattedAgents });
    });
    getAllSymptoms().then(symptoms => {
      let formattedSymptoms = symptoms.map(s => ({ ...s, value: s.id, label: s.symptom }));
      this.setState({ symptoms, formattedSymptoms });
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Shell auth={auth}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/oaks" render={() => <Oaks oaks={this.state.oaks} options={this.state.formattedOaks} />} />
              <Route path="/agents" render={() => <Agents agents={this.state.agents} options={this.state.formattedAgents} />} />
              <Route path="/hi/interaction/:id" component={InteractionPage} />
              <Route path="/hi" render={() => <InteractionSearch oaks={this.state.formattedOaks} symptoms={this.state.formattedSymptoms} />} />
              <Route path="/login" render={() => <Login auth={auth} />} />
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}/>
            </Switch>
          </Shell>
        </Router>
      </div>
    );
  }
}

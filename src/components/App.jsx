import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shell from './Shell.jsx';
import Landing from './landing/index.jsx';
import Agents from './agents/index.jsx';
import Oaks from './oaks/index.jsx';
import Interactions from './interactions/index.jsx';
import { getAllOaks } from 'coda/services/oaks';
import { getAllAgentSynonyms } from 'coda/services/agents';

const format = (records) => records.map(r => ({ value: r.id, label: `${r.genus} ${r.species} ${r.commonName? `(${r.commonName})` : ''}` }));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oaks: [],
      formattedOaks: [],
      agents: [],
      formattedAgents: []
    };
  }

  componentWillMount() {
    getAllOaks().then(oaks => {
      let formattedOaks = format(oaks);
      this.setState({ oaks, formattedOaks });
    });
    getAllAgentSynonyms().then(agents => {
      let formattedAgents = format(agents);
      this.setState({ agents, formattedAgents });
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Shell>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/oaks" render={() => <Oaks oaks={this.state.oaks} options={this.state.formattedOaks} />} />
              <Route path="/agents" render={() => <Agents agents={this.state.agents} options={this.state.formattedAgents} />} />
              <Route path="/hi" component={Interactions} />
            </Switch>
          </Shell>
        </Router>
      </div>
    );
  }
}

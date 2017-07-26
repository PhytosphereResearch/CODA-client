import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shell from './Shell.jsx';
import Landing from './landing/index.jsx';
import Agents from './agents/index.jsx';
import Oaks from './oaks/index.jsx';
import Interactions from './interactions/index.jsx';

const App = () =>
  <div>
    <Router>
      <Shell>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/oaks" component={Oaks} />
          <Route path="/agents" component={Agents} />
          <Route path="/hi" component={Interactions} />
          <Route path="/default" component={Landing} />
        </Switch>
      </Shell>
    </Router>
  </div>;

export default App;

import React, { Component } from 'react';
// import { test } from 'coda/services/agents';

export default class EditInteractions extends Component {
  render() {
    return (
      <div>
        <h3>Host-Agent Interactions</h3>
          Form Goes Here
          <button onClick={() => console.log('submitted')}>SUBMIT</button>
      </div>
    );
  }
}

import React, { Component } from 'react';
// import { test } from 'coda/services/agents';

export default class EditSymptoms extends Component {
  render() {
    return (
      <div>
        <h3>Symptoms</h3>
          Form Goes Here
          <button onClick={() => console.log('submitted')}>SUBMIT</button>
      </div>
    );
  }
}

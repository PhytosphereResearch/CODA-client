import { arrayBufferToString } from './utils';

const url = 'http://localhost:3000'; // TODO per environment setup

export function getAllAgentSynonyms() {
  return fetch(`${url}/syn`, { mode: 'cors' })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        console.warn(res);
        return [];
      }
    })
    .then(agents => {
      agents.forEach(agent => {
        agent.commonName = agent.agent.commonName;
      });
      return agents;
    })
    .catch(err => {
      console.warn(err);
      return [];
    });
}

export function getAgent(id) {
  return fetch(`${url}/agent/${id}`, { mode: 'cors' })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        console.warn(res);
        return {};
      }
    })
    .then(agent => {
      agent.primarySynonym = agent.synonyms.find(synonym => synonym.isPrimary);
      agent.otherSynonyms = agent.synonyms.filter(synonym => !synonym.isPrimary);
      agent.notes = arrayBufferToString(agent.notes.data).replace(' -', '\n-');
      agent.rangeData = [];
      agent.hosts = [];
      agent.hostInteractions.forEach(interaction => { // iterate over interactions
        interaction.countiesByRegions.forEach(county => { // extract all range data into a single array
          agent.rangeData.push(county.countyCode);
        });
        agent.hosts.push(interaction.oak);
      });
      return agent;
    })
    .catch(err => {
      console.warn(err);
      return {};
    });
}

import { arrayBufferToString } from './utils';
import { url } from './environments';

export const getAllAgentSynonyms = () => {
  const headers = new Headers();
  return fetch(`${url}/syn`, { headers, method: 'GET', mode: 'cors' })
    .then(res => {
      if (res.ok) {
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
};

export const getAgent = (id) => {
  return fetch(`${url}/agent/${id}`, { mode: 'cors' })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.warn(res);
        return {};
      }
    })
    .then(agent => {
      agent.primarySynonym = agent.synonyms.find(synonym => synonym.isPrimary);
      agent.otherSynonyms = agent.synonyms.filter(synonym => !synonym.isPrimary);
      agent.notes = arrayBufferToString(agent.notes.data).replace(/ -/g, '\n-');
      agent.rangeData = [];
      agent.hosts = [];
      agent.hostInteractions.forEach(interaction => { // iterate over interactions
        interaction.countiesByRegions.forEach(county => { // extract all range data into a single array
          agent.rangeData.push(county.countyCode);
        });
        interaction.oak.interactionId = interaction.id;
        agent.hosts.push(interaction.oak);
      });
      return agent;
    })
    .catch(err => {
      console.warn(err);
      return {};
    });
};

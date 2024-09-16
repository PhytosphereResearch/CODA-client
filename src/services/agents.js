import flatMap from 'lodash/flatmap';
import uniq from 'lodash/uniq';
import { checkResponse, bufferToString } from './utils';
import { url } from './environments';
import { auth } from '../components/App';

export const getAllAgentSynonyms = () => {
  const headers = new Headers();
  return fetch(`${url}/syn`, { headers, method: 'GET', mode: 'cors' })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.warn(res);
      return [];
    })
    .then((agents) => {
      agents.forEach((agent) => {
        agent.commonName = agent.agent.commonName;
      });
      return agents;
    })
};

export const getAgentFields = () => {
  const headers = new Headers();
  return fetch(`${url}/agent/fields`, { headers, method: 'GET', mode: 'cors' })
    .then(checkResponse)
    .then(res => res)
    .catch(() => {});
};

export const formatAgentFields = (fields) => {
  const formattedFields = {};
  const mapField = (field, fieldName) => field.map(entry => ({ value: entry, label: entry, field: fieldName }));
  for (var field in fields) { // eslint-disable-line
    const formattedField = mapField(fields[field], field);
    formattedFields[field] = formattedField;
  }

  return formattedFields;
};

export const getAgent = id => fetch(`${url}/agent/${id}`, { mode: 'cors' })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    console.warn(res);
    return {};
  })
  .then((agent) => {
    agent.synonyms.forEach((synonym) => {
      synonym.notes = bufferToString(synonym.notes).replace(/ -/g, '\n-');
    });
    agent.primarySynonym = agent.synonyms.find(synonym => synonym.isPrimary);
    agent.otherSynonyms = agent.synonyms.filter(synonym => !synonym.isPrimary);
    agent.notes = bufferToString(agent.notes).replace(/ -/g, '\n-');
    agent.rangeData = uniq(flatMap(agent.hostInteractions, int => int.countiesByRegions.map(c => c.countyCode)));
    agent.hosts = [];
    agent.hostInteractions.forEach((interaction) => { // iterate over interactions
      interaction.oak.interactionId = interaction.id;
      agent.hosts.push(interaction.oak);
    });
    return agent;
  })
  .catch((err) => {
    console.warn(err);
    return {};
  });

export const addOrUpdateAgent = (agent) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  return fetch(`${url}/agent`, {
    headers, method: 'POST', body: JSON.stringify(agent), mode: 'cors',
  })
    .then(checkResponse);
};

export const addOrUpdateSynonym = (synonym) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  return fetch(`${url}/syn`, {
    headers, method: 'POST', body: JSON.stringify(synonym), mode: 'cors',
  })
    .then(checkResponse);
};

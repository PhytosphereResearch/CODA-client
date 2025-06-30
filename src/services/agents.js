import { flatMap, uniq } from "lodash";
import { checkResponse, bufferToString } from "./utils";
import { url } from "./environments";

export const getAllAgentSynonyms = async () => {
  const headers = new Headers();
  return fetch(`${url}/syn`, { headers, method: "GET", mode: "cors" })
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
    });
};

export const getAgentFields = async () => {
  const headers = new Headers();
  return fetch(`${url}/agent/fields`, { headers, method: "GET", mode: "cors" })
    .then(checkResponse)
    .then((res) => res);
};

export const formatAgentFields = (fields) => {
  const formattedFields = {};
  const mapField = (field, fieldName) =>
    field.map((entry) => ({ value: entry, label: entry, field: fieldName }));
  for (var field in fields) {
    // eslint-disable-line
    const formattedField = mapField(fields[field], field);
    formattedFields[field] = formattedField;
  }

  return formattedFields;
};

export const getAgent = (id) =>
  fetch(`${url}/agent/${id}`, { mode: "cors" })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.warn(res);
      return {};
    })
    .then((agent) => {
      agent.synonyms.forEach((synonym) => {
        synonym.notes = bufferToString(synonym.notes).replace(/ -/g, "\n-");
      });
      agent.primarySynonym = agent.synonyms.find(
        (synonym) => synonym.isPrimary
      );
      agent.otherSynonyms = agent.synonyms.filter(
        (synonym) => !synonym.isPrimary
      );
      agent.notes = bufferToString(agent.notes).replace(/ -/g, "\n-");
      agent.rangeData = uniq(
        flatMap(agent.hostInteractions, (int) =>
          int.countiesByRegions.map((c) => c.countyCode)
        )
      );
      agent.hosts = [];
      agent.hostInteractions.forEach((interaction) => {
        // iterate over interactions
        interaction.oak.interactionId = interaction.id;
        agent.hosts.push(interaction.oak);
      });
      return agent;
    });

export const addOrUpdateAgent = async (key, { arg: { agent, accessToken, userName } }) => {
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  const res = await fetch(`${url}/agent`, {
    headers,
    method: "POST",
    body: JSON.stringify({ agent, userName }),
    mode: "cors",
  });
  return checkResponse(res);
};

export const addOrUpdateSynonym = async (key, { arg: { synonym, accessToken, userName } }) => {
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  return fetch(`${url}/syn`, {
    headers,
    method: "POST",
    body: JSON.stringify({ synonym, userName }),
    mode: "cors",
  }).then(checkResponse);
};

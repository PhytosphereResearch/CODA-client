import { checkResponse } from './utils';
import arrayBufferToString from 'arraybuffer-to-string';
import flatMap from 'lodash.flatmap';
import uniq from 'lodash.uniq';
import { url } from './environments';
import { auth } from '../components/App.jsx';
import { splitSemicolons } from './utils.js';


export const getAllSymptoms = () => {
  const headers = new Headers();
  return fetch(`${url}/symptoms`, { headers, method: 'GET', mode: 'cors' })
    .then(checkResponse)
    .then(symptoms => {
      symptoms.forEach(symptom => {
        symptom.description = arrayBufferToString(symptom.description.data);
      });
      return symptoms;
    })
    .catch(err => {
      console.warn(err);
      return [];
    });
};

export const addOrUpdateSymptom = (symptom) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  return fetch(`${url}/symptoms`, { headers, method: 'POST', body: JSON.stringify(symptom), mode: 'cors' })
    .then(checkResponse);
};

export const getInteractions = (plantPart, symptomId, oakId) => {
  return fetch(`${url}/interactionQuery?plantPart=${plantPart || ''}&symptomId=${symptomId || ''}&oakId=${oakId || ''}`, { mode: 'cors' })
    .then(checkResponse)
    .then(interactions => interactions.map(interaction => {
      interaction.subSite = interaction.subSite.toLowerCase().replace(/;/g, ', ');
      interaction.maturity = interaction.maturity.toLowerCase().replace(/;/g, ', ');
      return interaction;
    }))
    .catch(err => {
      console.warn(err);
      return [];
    });
};

export const getInteractionsByOakAndAgent = (interactionQuery) => {
  return fetch(`${url}/hi?agentId=${interactionQuery.agentId}&oakId=${interactionQuery.oakId}`, { mode: 'cors' })
    .then(checkResponse)
    .then(interaction => {
      interaction.notes = arrayBufferToString(interaction.notes.data);
      interaction.hostLifeStage = splitSemicolons(interaction.hostLifeStage);
      interaction.situation = splitSemicolons(interaction.situation);
      interaction.hiSymptoms.forEach(hiSymptom => {
        hiSymptom.maturity = splitSemicolons(hiSymptom.maturity);
        hiSymptom.subSite = splitSemicolons(hiSymptom.subSite);
        if (hiSymptom.isPrimary === 'Secondary (attacks stressed, injured or compromise') {
          hiSymptom.isPrimary = 'Secondary (attacks stressed, injured, or compromised tissue)';
        }
      });
      return interaction;
    })
    .catch(err => {
      console.warn(err);
      return {};
    });
};

export const getInteraction = (id) => {
  return fetch(`${url}/hi/${id}`, { mode: 'cors' })
    .then(checkResponse)
    .then(interaction => {
      // clean up agent record
      let primarySynonym = interaction.agent.synonyms.find(synonym => synonym.isPrimary);
      let synonyms = interaction.agent.synonyms.filter(synonym => !synonym.isPrimary);
      let { authority, genus, species, subspecies } = primarySynonym;
      interaction.agent.notes = arrayBufferToString(interaction.agent.notes.data).replace(/ -/g, '\n-');
      interaction.agent = { ...interaction.agent, authority, genus, species, subspecies, synonyms };
      // decode notes
      interaction.notes = arrayBufferToString(interaction.notes.data).replace(/ -/g, '\n-');
      // decode citation titles and notes
      interaction.bibs.forEach(bib => {
        bib.title = arrayBufferToString(bib.title.data);
        bib.notes = arrayBufferToString(bib.notes.data).replace(/ -/g, '\n-');
      });
      // map interaction range data
      interaction.range = interaction.countiesByRegions.map(county => county.countyCode);
      // sort direct and indirect symptoms
      interaction.directSymptoms = interaction.hiSymptoms.filter(s => !s.isIndirect);
      interaction.indirectSymptoms = interaction.hiSymptoms.filter(s => s.isIndirect);
      interaction.agentRange = uniq(flatMap(
        interaction.agent.hostInteractions,
        interaction => interaction.countiesByRegions.map(c => c.countyCode)
      ));
      // return updated record
      return interaction;
    })
    .catch(err => {
      console.warn(err);
      return {};
    });
};

export const getSubSites = () => {
  return fetch(`${url}/hi/symptoms`, { mode: 'cors ' })
    .then(res => res.json())
    .catch(err => {
      console.warn(err);
      return [];
    });
};

export const getReferences = () => {
  let headers = new Headers();
  return fetch(`${url}/bib`, { headers, method: 'GET', mode: 'cors' })
    .then(checkResponse)
    .then(references => references.map(reference => {
      reference.title = arrayBufferToString(reference.title.data);
      reference.notes = arrayBufferToString(reference.notes.data);
      return reference;
    })
  )
  .catch(err => {
    console.warn(err);
    return [];
  });
};

export const addOrUpdateReference = (reference) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  return fetch(`${url}/bib`, { headers, method: 'POST', body: JSON.stringify(reference), mode: 'cors' })
    .then(checkResponse);
};

import arrayBufferToString from 'arraybuffer-to-string';
import { remove } from 'lodash';
import { checkResponse, splitSemicolons } from './utils';
import { url } from './environments';
import { auth } from '../components/App';


export const getAllSymptoms = () => {
  const headers = new Headers();
  return fetch(`${url}/symptoms`, { headers, method: 'GET', mode: 'cors' })
    .then(checkResponse)
    .then((symptoms) => {
      symptoms.forEach((symptom) => {
        symptom.description = symptom.description && arrayBufferToString(symptom.description.data);
      });
      return symptoms;
    })
    .catch((err) => {
      console.warn(err);
      return [];
    });
};

export const addOrUpdateSymptom = (symptom) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  return fetch(`${url}/symptoms`, {
    headers, method: 'POST', body: JSON.stringify(symptom), mode: 'cors',
  })
    .then(checkResponse);
};

export const getInteractions = (plantPart, symptomId, oakId) => fetch(`${url}/interactionQuery?plantPart=${plantPart || ''}&symptomId=${symptomId || ''}&oakId=${oakId || ''}`, { mode: 'cors' })
  .then(checkResponse)
  .then(interactions => interactions.map((interaction) => {
    interaction.subSite = interaction.subSite.toLowerCase().replace(/;/g, ', ');
    interaction.maturity = interaction.maturity.toLowerCase().replace(/;/g, ', ');
    return interaction;
  }))
  .catch((err) => {
    console.warn(err);
    return [];
  });

export const getInteractionsByOakAndAgent = interactionQuery => fetch(`${url}/hi?agentId=${interactionQuery.agentId}&oakId=${interactionQuery.oakId}`, { mode: 'cors' })
  .then(checkResponse)
  .then((interaction) => {
    if (!interaction) {
      throw new Error('404: Interaction not found');
    }
    interaction.notes = interaction.notes && arrayBufferToString(interaction.notes.data);
    interaction.hostLifeStage = splitSemicolons(interaction.hostLifeStage);
    interaction.situation = splitSemicolons(interaction.situation);
    interaction.rangeData = interaction.countiesByRegions.map(county => county.countyCode);
    interaction.bibs = interaction.bibs.map(bib => ({ label: bib.description, value: bib.id }));
    interaction.countiesByRegions = interaction.countiesByRegions || [];
    interaction.hiSymptoms.forEach((hiSymptom) => {
      hiSymptom.maturity = hiSymptom.maturity ? splitSemicolons(hiSymptom.maturity) : [];
      hiSymptom.subSite = hiSymptom.subSite ? splitSemicolons(hiSymptom.subSite) : [];
      hiSymptom.isPrimary = hiSymptom.isPrimary ? splitSemicolons(hiSymptom.isPrimary) : [];
      if (hiSymptom.isPrimary.includes('Secondary (attacks stressed, injured or compromise')) {
        remove(hiSymptom.isPrimary, element => element === 'Secondary (attacks stressed, injured or compromise');
        hiSymptom.isPrimary.push('Secondary (attacks stressed, injured, or compromised tissue)');
      }
    });
    return interaction;
  })
  .catch((err) => {
    console.warn(err);
    return {};
  });

export const getInteraction = id => fetch(`${url}/hi/${id}`, { mode: 'cors' })
  .then(checkResponse)
  .then((interaction) => {
    // clean up agent record
    const primarySynonym = interaction.agent.synonyms.find(synonym => synonym.isPrimary);
    const synonyms = interaction.agent.synonyms.filter(synonym => !synonym.isPrimary);
    const {
      authority, genus, species, subspecies,
    } = primarySynonym;
    interaction.agent.notes = interaction.agent.notes && arrayBufferToString(interaction.agent.notes.data).replace(/ -/g, '\n-');
    interaction.agent = {
      ...interaction.agent, authority, genus, species, subspecies, synonyms,
    };
    // decode notes
    interaction.notes = interaction.notes && arrayBufferToString(interaction.notes.data).replace(/ -/g, '\n-');
    // decode citation titles and notes
    interaction.bibs.forEach((bib) => {
      bib.title = bib.title && arrayBufferToString(bib.title.data);
      bib.notes = bib.notes && arrayBufferToString(bib.notes.data).replace(/ -/g, '\n-');
    });
    // map interaction range data
    interaction.range = interaction.countiesByRegions.map(county => county.countyCode);
    // sort direct and indirect symptoms
    interaction.directSymptoms = interaction.hiSymptoms.filter(s => !s.isIndirect);
    interaction.indirectSymptoms = interaction.hiSymptoms.filter(s => s.isIndirect);
    // return updated record
    return interaction;
  })
  .catch((err) => {
    console.warn(err);
    return {};
  });

export const getSubSites = () => {
  const headers = new Headers();
  return fetch(`${url}/hi/symptoms`, { headers, method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .catch((err) => {
      console.warn(err);
      return [];
    });
};


export const getReferences = () => {
  const headers = new Headers();
  return fetch(`${url}/bib`, { headers, method: 'GET', mode: 'cors' })
    .then(checkResponse)
    .then(references => references.map((reference) => {
      reference.title = reference.title && arrayBufferToString(reference.title.data);
      reference.notes = reference.notes && arrayBufferToString(reference.notes.data);
      return reference;
    }))
    .catch((err) => {
      console.warn(err);
      return [];
    });
};

export const addOrUpdateReference = (reference) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  return fetch(`${url}/bib`, {
    headers, method: 'POST', body: JSON.stringify(reference), mode: 'cors',
  })
    .then(checkResponse);
};

export const addOrUpdateHi = (hi) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  return fetch(`${url}/hi`, {
    headers, method: 'POST', body: JSON.stringify(hi), mode: 'cors',
  })
    .then(checkResponse);
};

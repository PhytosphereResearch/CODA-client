import { arrayBufferToString, checkResponse } from './utils';
import flatMap from 'lodash.flatmap';
import uniq from 'lodash.uniq';

const url = 'http://localhost:3000'; // TODO per environment setup

export const getAllSymptoms = () => {
  return fetch(`${url}/symptoms`, { mode: 'cors' })
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

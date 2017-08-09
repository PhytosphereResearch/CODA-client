import { arrayBufferToString, checkResponse } from './utils';

const url = 'http://localhost:3000'; // TODO per environment setup

export const getAllSymptoms = () => {
  return fetch(`${url}/symptoms`, { mode: 'cors' })
    .then(checkResponse)
    .catch(err => {
      console.warn(err);
      return [];
    });
};

export const getInteractions = (plantPart, symptomId, oakId) => {
  return fetch(`${url}/interactionQuery?plantPart=${plantPart || ''}&symptomId=${symptomId || ''}&oakId=${oakId || ''}`, { mode: 'cors' })
    .then(checkResponse)
    .then(interactions => interactions.map(interaction => {
      interaction.subSite = interaction.subSite.toLowerCase().replace(';', ', ');
      interaction.maturity = interaction.maturity.toLowerCase().replace(';', ', ');
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
      interaction.agent.notes = arrayBufferToString(interaction.agent.notes.data).replace(' -', '\n-');
      interaction.agent = { ...interaction.agent, authority, genus, species, subspecies, synonyms };
      // decode notes
      interaction.notes = arrayBufferToString(interaction.notes.data).replace(' -', '\n-');
      // decode citation titles and notes
      interaction.bibs.forEach(bib => {
        bib.title = arrayBufferToString(bib.title.data);
        bib.notes = arrayBufferToString(bib.notes.data).replace(' -', '\n-');
      });
      // map interaction range data
      interaction.range = interaction.countiesByRegions.map(county => county.countyCode);
      // sort direct and indirect symptoms
      interaction.directSymptoms = interaction.hiSymptoms.filter(s => !s.isIndirect);
      interaction.indirectSymptoms = interaction.hiSymptoms.filter(s => s.isIndirect);
      // return updated record
      return interaction;
    })
    .catch(err => {
      console.warn(err);
      return {};
    });
};

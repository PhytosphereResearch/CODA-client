import { arrayBufferToString, checkResponse } from './utils';

const url = 'http://localhost:3000'; // TODO per environment setup

export function getAllSymptoms() {
  return fetch(`${url}/symptoms`, { mode: 'cors' })
    .then(checkResponse)
    .catch(err => {
      console.warn(err);
      return [];
    });
}

export function getInteractions(plantPart, symptomId, oakId) {
  return fetch(`${url}/interactionQuery?plantPart=${plantPart}&symptomId=${symptomId}&oakId=${oakId}`, { mode: 'cors' })
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
}

export function getInteraction(id) {
  return fetch(`${url}/hi/${id}`, { mode: "cors" })
    .then(checkResponse)
    .then(interaction => {
      let primarySynonym = interaction.agent.synonyms.find(synonym => synonym.isPrimary);
      let synonyms = interaction.agent.synonyms.filter(synonym => !synonym.isPrimary);
      let { authority, genus, species, subspecies } = primarySynonym;
      interaction.agent.notes = arrayBufferToString(interaction.agent.notes.data).replace(' -', '\n-');
      interaction.agent = { ...interaction.agent, authority, genus, species, subspecies, synonyms };
      interaction.notes = arrayBufferToString(interaction.notes.data).replace(' -', '\n-');
      interaction.bibs.forEach(bib => {
        bib.title = arrayBufferToString(bib.title.data);
        bib.notes = arrayBufferToString(bib.notes.data).replace(' -', '\n-');
      });
      interaction.range = interaction.countiesByRegions.map(county => county.countyCode);
      return interaction;
    })
    .catch(err => {
      console.warn(err);
      return {};
    });
}

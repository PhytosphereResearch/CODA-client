const url = 'http://localhost:3000'; // TODO per environment setup

export function getAllSymptoms() {
  return fetch(`${url}/symptoms`, { mode: 'cors' })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        console.warn(res);
        return [];
      }
    })
    .catch(err => {
      console.warn(err);
      return [];
    });
}

export function getInteractions(plantPart, symptomId, oakId) {
  return fetch(`${url}/interactionQuery?plantPart=${plantPart}&symptomId=${symptomId}&oakId=${oakId}`, { mode: 'cors' })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        console.warn(res);
        return [];
      }
    })
    .then(interactions => interactions.map(interaction => {
      interaction.subSite = interaction.subSite.toLowerCase();
      interaction.maturity = interaction.maturity.toLowerCase();
      return interaction;
    }))
    .catch(err => {
      console.warn(err);
      return [];
    });
}

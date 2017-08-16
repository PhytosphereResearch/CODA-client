import { arrayBufferToString, checkResponse } from './utils';
import { url } from './environments';
// const url = 'http://localhost:3000'; // TODO per environment setup

export const getAllOaks = () => {
  let headers = new Headers();
  return fetch(`${url}/oaks`, { headers, method: 'GET', mode: 'cors' })
    .then(checkResponse)
    .catch(err => {
      console.warn(err);
      return [];
    });
};

export const getPlantCode = (oak) => {
  var qstring = `Genus=${oak.genus}&Species=${oak.species}&Variety=${oak.subSpecies}&limit=1`;
  return fetch('https://plantsdb.xyz/search?' + qstring)
    .then(checkResponse)
    .then(res => res.data[0].Accepted_Symbol_x)
    .then(code => {
      oak.code = code;
      return oak;
    })
    .catch(err => {
      console.warn(err);
      oak.code = '';
      return oak;
    });
};

export const getOak = (id) => {
  return fetch(`${url}/oaks/${id}`, { mode: 'cors' })
  .then(checkResponse)
  .then(getPlantCode)
  .then(oak => {
    oak.notes = arrayBufferToString(oak.notes.data).replace(/ -/g, '\n-');
    return oak;
  })
  .catch(err => {
    console.warn(err);
    return {};
  });
};

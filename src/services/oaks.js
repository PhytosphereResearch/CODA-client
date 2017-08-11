import { arrayBufferToString } from './utils';

const url = 'http://localhost:3000'; // TODO per environment setup

export const getAllOaks = () => {
  return fetch(`${url}/oaks`, { mode: 'cors' })
    .then(res => {
      if (res.ok) {
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
};

export const getOak = (id) => {
  return fetch(`${url}/oaks/${id}`, { mode: 'cors' })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      console.warn(res);
      return {};
    }
  })
  .then(oak => {
    oak.notes = arrayBufferToString(oak.notes.data).replace(/ -/g, '\n-');
    return oak;
  })
  .catch(err => {
    console.warn(err);
    return {};
  });
};

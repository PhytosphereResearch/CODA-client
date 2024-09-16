import { checkResponse, bufferToString } from './utils';
import { auth } from '../components/App';
import { url } from './environments';

export const getAllOaks = () => {
  const headers = new Headers();
  return fetch(`${url}/oaks`, { headers, method: 'GET', mode: 'cors' })
    .then(checkResponse)
};

export const getOak = (id) => fetch(`${url}/oaks/${id}`, { mode: 'cors' })
  .then(checkResponse)
  .then((oak) => {
    oak.notes = bufferToString(oak.notes).replace(/ -/g, '\n-');
    return oak;
  })
  .catch((err) => {
    console.warn(err);
    return {};
  });

export const addOrUpdateOak = (oak) => {
  const headers = new Headers({
    Authorization: `Bearer ${auth.getAccessToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  return fetch(`${url}/oaks`, {
    headers, method: 'POST', body: JSON.stringify(oak), mode: 'cors',
  })
    .then(checkResponse);
};

import { checkResponse, bufferToString } from "./utils";
import { url } from "./environments";

export const getAllOaks = () => {
  const headers = new Headers();
  return fetch(`${url}/oaks`, { headers, method: "GET", mode: "cors" }).then(
    checkResponse
  );
};

export const getOak = (id) =>
  fetch(`${url}/oaks/${id}`, { mode: "cors" })
    .then(checkResponse)
    .then((oak) => {
      oak.notes = bufferToString(oak.notes).replace(/ -/g, "\n-");
      return oak;
    });

export const addOrUpdateOak = (oak, accessToken) => {
  console.log('oak token', accessToken, typeof accessToken)
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  return fetch(`${url}/oaks`, {
    headers,
    method: "POST",
    body: JSON.stringify(oak),
    mode: "cors",
  }).then(checkResponse);
};

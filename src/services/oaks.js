import { checkResponse, bufferToString } from "./utils";
import { url } from "./environments";

export const getAllOaks = async () => {
  const headers = new Headers();
  const res = await fetch(`${url}/oaks`, {
    headers,
    method: "GET",
    mode: "cors",
  });
  return checkResponse(res);
};

export const getOak = (id) =>
  fetch(`${url}/oaks/${id}`, { mode: "cors" })
    .then(checkResponse)
    .then((oak) => {
      oak.notes = bufferToString(oak.notes).replace(/ -/g, "\n-");
      return oak;
    });

export const addOrUpdateOak = async (
  key,
  { arg: { oak, accessToken, userName } },
) => {
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  const res = await fetch(`${url}/oaks`, {
    headers,
    method: "POST",
    body: JSON.stringify({ oak, userName }),
    mode: "cors",
  });
  return checkResponse(res);
};

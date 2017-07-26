const url = 'http://localhost:3000'; // TODO per environment setup

export function getAllOaks() {
  return fetch(`${url}/oaks`, {mode: 'cors'})
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

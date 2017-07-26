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
    .then(res => console.log(res))
    .catch(err => {
      console.warn(err);
      return [];
    });
}

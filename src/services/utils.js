export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusCode, res.message);
  }
};

export const splitSemicolons = (string) => string.split(';').map(s => s.trim());
export const joinSemicolons = (array) => array.join('; ');

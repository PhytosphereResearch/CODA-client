import arrayBufferToString from 'arraybuffer-to-string';

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusCode, res.message);
};

export const splitSemicolons = string => string.split(';').map(s => s.trim());
export const joinSemicolons = array => array.join('; ');
export const bufferToString = (buffer) => {
  if (!buffer || !buffer.data) {
    return '';
  }
  return arrayBufferToString(buffer.data);
};

export async function checkResponse<T>(res: Response) {
  if (res.ok) {
    const response: T = await res.json();
    return response;
  }
  throw new Error(`${res.status}: ${res.statusText}`);
}

export const splitSemicolons = (string: string) =>
  string.split(';').map((s) => s.trim());
export const joinSemicolons = (array: string[]) => array.join('; ');
export const bufferToString = (buffer) => {
  if (!buffer || !buffer.data) {
    return '';
  }
  // @ts-expect-error typescript doesn't think uint16 is a number
  return String.fromCharCode.apply(null, new Uint16Array(buffer.data));
};

export const apiFetch = (url, options={}) => {
  return fetch(`http://192.168.43.200:1337/${url}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    ...options
  });
};

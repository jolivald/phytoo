export const apiFetch = (url, options={}) => {
  return fetch(`http://192.168.1.19:1337/${url}`, {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options
  });
};

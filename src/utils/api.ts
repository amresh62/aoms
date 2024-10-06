const ApiUrl = process.env.REACT_APP_API_URL;

export const fetchWithCredentials = (url: string, options: RequestInit = {}) => {
  return fetch(`${ApiUrl}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });
};
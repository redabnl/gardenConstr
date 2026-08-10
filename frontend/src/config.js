export const API_BASE_URL =
  process.env.REACT_APP_API_URL !== undefined
    ? process.env.REACT_APP_API_URL.replace(/\/+$/, '')
    : 'http://localhost:5000';

import axios from 'axios';
axios.defaults.withCredentials = true;

const BASE_URL = 'https://interns-test-fe.snp.agency/api/v1';

const getScopeKey = () => {
  let scopeKey = localStorage.getItem('scope-key');
  if (!scopeKey) {
    scopeKey = Math.random().toString(36).substring(2);
    localStorage.setItem('scope-key', scopeKey);
  }
  return scopeKey;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'scope-key': getScopeKey(),
  },
});

export default api;

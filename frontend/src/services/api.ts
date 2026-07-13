import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', new URLSearchParams(data)),
  getMe: () => api.get('/auth/me'),
};

export const applicantsAPI = {
  getApplicants: (skip = 0, limit = 100) =>
    api.get(`/applicants?skip=${skip}&limit=${limit}`),
  getApplicant: (applicantId: string) =>
    api.get(`/applicants/${applicantId}`),
  createApplicant: (data: any) =>
    api.post('/applicants', data),
  updateApplicant: (applicantId: string, data: any) =>
    api.put(`/applicants/${applicantId}`, data),
  deleteApplicant: (applicantId: string) =>
    api.delete(`/applicants/${applicantId}`),
};

export const predictionsAPI = {
  predict: (data: any) =>
    api.post('/predictions/predict', data),
  getPredictions: (skip = 0, limit = 100) =>
    api.get(`/predictions?skip=${skip}&limit=${limit}`),
};

export const dashboardAPI = {
  getStatistics: () =>
    api.get('/dashboard/statistics'),
};

export default api;

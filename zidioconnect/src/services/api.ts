import axios from 'axios';
import { UserProfile, JobApplication, JobListing, ApplicationStats } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userApi = {
  getProfile: () => api.get<UserProfile>('/user/profile'),
  updateProfile: (data: Partial<UserProfile>) => api.put<UserProfile>('/user/profile', data),
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post<{ avatarUrl: string }>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const jobsApi = {
  getApplications: () => api.get<JobApplication[]>('/applications'),
  getApplication: (id: number) => api.get<JobApplication>(`/applications/${id}`),
  submitApplication: (jobId: number) => api.post<JobApplication>('/applications', { jobId }),
  updateApplication: (id: number, data: Partial<JobApplication>) =>
    api.put<JobApplication>(`/applications/${id}`, data),
  getStats: () => api.get<ApplicationStats>('/applications/stats'),
  
  // Job listings
  getJobListings: (params?: { search?: string; page?: number; limit?: number }) =>
    api.get<{ jobs: JobListing[]; total: number }>('/jobs', { params }),
  getJobListing: (id: number) => api.get<JobListing>(`/jobs/${id}`),
};

export default api; 
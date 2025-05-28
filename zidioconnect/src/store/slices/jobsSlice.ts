import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  isBookmarked: boolean;
}

interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const job = state.jobs.find(job => job.id === action.payload);
      if (job) {
        job.isBookmarked = !job.isBookmarked;
      }
    },
  },
});

export const { setJobs, setLoading, setError, toggleBookmark } = jobsSlice.actions;
export default jobsSlice.reducer; 
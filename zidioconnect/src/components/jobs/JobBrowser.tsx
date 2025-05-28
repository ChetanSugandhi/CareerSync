import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Grid,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { format } from 'date-fns';
import { JobListing } from '../../types';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

const JobBrowser: React.FC = () => {
  const { submitApplication } = useApp();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/jobs', {
        params: {
          search,
          page,
          limit: 10,
        },
      });
      setJobs(response.data.jobs);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs, page, search]);

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handleApply = async () => {
    if (selectedJob) {
      try {
        await axios.post('http://localhost:5000/api/applications', {
          jobId: selectedJob.id,
          userId: user?.id,
        });
        setDialogOpen(false);
        console.log('Application submitted successfully!');
      } catch (error) {
        console.error('Failed to submit application:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search Jobs"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {job.position}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {job.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {job.location} • {job.salary}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={`Posted ${format(new Date(job.postedDate), 'MMM d, yyyy')}`}
                      size="small"
                    />
                    <Button variant="contained" color="primary" onClick={() => handleJobClick(job)}>
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedJob && (
          <>
            <DialogTitle>
              {selectedJob.position} at {selectedJob.company}
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" gutterBottom>
                Location: {selectedJob.location}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Salary: {selectedJob.salary}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedJob.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Requirements:
              </Typography>
              <ul>
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>
                    <Typography variant="body1">{req}</Typography>
                  </li>
                ))}
              </ul>
              <Typography variant="body2" color="textSecondary">
                Application Deadline: {format(new Date(selectedJob.deadline), 'MMMM d, yyyy')}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              <Button onClick={handleApply} variant="contained" color="primary">
                Apply Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default JobBrowser; 
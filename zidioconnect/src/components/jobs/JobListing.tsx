import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';

// Define Job interface if not already defined elsewhere and imported
interface Job {
  _id: string; // Assuming _id from Mongoose model
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedDate: string; // Or Date type if parsing is handled
  description: string;
  requirements: string[];
  // Add other fields as per your backend Job model
}

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('all');
  const [location, setLocation] = useState('all');
  const [jobs, setJobs] = useState<Job[]>([]); // Use Job interface and initialize as empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  // Mock data - replace with actual data from your backend
  // const jobs = [ ... ]; // Remove mock data

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, jobType, location]); // Add dependencies for refetching

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      // Fetch data from backend API
      const response = await axios.get('http://localhost:5000/api/jobs', {
        params: {
          search: searchTerm,
          type: jobType === 'all' ? undefined : jobType,
          location: location === 'all' ? undefined : location,
          // Add pagination parameters if your backend supports it
          // page: 1,
          // limit: 10,
        },
      });
      setJobs(response.data.jobs); // Assuming response structure has a 'jobs' array
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleJobTypeChange = (event: any) => {
    setJobType(event.target.value);
  };

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  // Function to handle applying for a job - needs implementation based on your application flow
  const handleApply = (jobId: string) => {
    console.log('Apply for job:', jobId);
    // Implement navigation to application page or open a modal
    // Example: navigate(`/apply/${jobId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select value={jobType} label="Job Type" onChange={handleJobTypeChange}>
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select value={location} label="Location" onChange={handleLocationChange}>
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="new-york">New York</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="san-francisco">San Francisco</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Job Listings */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : jobs.length === 0 ? (
        <Typography variant="h6" textAlign="center">No jobs found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} key={job._id}> {/* Use job._id as key */}
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {job.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <BusinessIcon sx={{ mr: 0.5 }} fontSize="small" />
                          {job.company}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <LocationOnIcon sx={{ mr: 0.5 }} fontSize="small" />
                          {job.location}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <WorkIcon sx={{ mr: 0.5 }} fontSize="small" />
                          {job.type}
                        </Typography>
                      </Box>
                    </Box>
                    {/* Bookmark Icon - needs backend integration */}
                    {/* <IconButton>
                      {job.isBookmarked ? (
                        <BookmarkIcon color="primary" />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </IconButton> */}
                  </Box>

                  <Typography variant="body1" paragraph>
                    {job.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Required Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {job.requirements.map((skill, index) => (
                        <Chip key={index} label={skill} size="small" /> // Using index as key, consider unique skill IDs if available
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Experience: {job.experience}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Salary: {job.salary}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                         Posted: {new Date(job.postedDate).toLocaleDateString()} {/* Format date */}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small">
                        Learn More {/* Needs implementation, possibly navigate to job detail page */}
                      </Button>
                      <Button variant="contained" size="small" onClick={() => handleApply(job._id)}> {/* Pass job._id to handleApply */}
                        Apply Now
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default JobListing; 
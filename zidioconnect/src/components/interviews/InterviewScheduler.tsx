import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  VideoCall as VideoCallIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

interface Interview {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  interviewerId: string;
  interviewerName: string;
  date: Date;
  duration: number;
  type: 'online' | 'onsite';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  meetingLink?: string;
  notes?: string;
}

const InterviewScheduler: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [newInterview, setNewInterview] = useState<Partial<Interview>>({
    type: 'online',
    duration: 60,
    status: 'scheduled',
  });
  const { user } = useApp();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/interviews');
      setInterviews(response.data);
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
      setError('Failed to fetch interviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/interviews',
        newInterview
      );

      if (response.status === 201) {
        await fetchInterviews();
        setDialogOpen(false);
        setNewInterview({ type: 'online', duration: 60, status: 'scheduled' });
      } else {
        setError('Failed to schedule interview');
      }
    } catch (error) {
      console.error('Failed to schedule interview:', error);
      setError('Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedInterview) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/interviews/${selectedInterview.id}`,
        selectedInterview
      );

      if (response.status === 200) {
        await fetchInterviews();
        setDialogOpen(false);
        setSelectedInterview(null);
      } else {
        setError('Failed to update interview');
      }
    } catch (error) {
      console.error('Failed to update interview:', error);
      setError('Failed to update interview');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (interviewId: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/interviews/${interviewId}/cancel`
      );

      if (response.status === 200) {
        await fetchInterviews();
      } else {
        setError('Failed to cancel interview');
      }
    } catch (error) {
      console.error('Failed to cancel interview:', error);
      setError('Failed to cancel interview');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Interview Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Schedule Interview
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <List>
            {interviews.map((interview) => (
              <ListItem key={interview.id}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{interview.jobTitle}</Typography>
                      <Chip
                        label={interview.status}
                        color={getStatusColor(interview.status)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        Candidate: {interview.candidateName}
                      </Typography>
                      <Typography variant="body2">
                        Interviewer: {interview.interviewerName}
                      </Typography>
                      <Typography variant="body2">
                        Date: {new Date(interview.date).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Duration: {interview.duration} minutes
                      </Typography>
                      {interview.type === 'online' ? (
                        <Typography variant="body2">
                          <VideoCallIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {interview.meetingLink}
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {interview.location}
                        </Typography>
                      )}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setSelectedInterview(interview);
                      setDialogOpen(true);
                    }}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleCancel(interview.id)}
                    color="error"
                    disabled={interview.status === 'cancelled'}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Schedule/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedInterview ? 'Edit Interview' : 'Schedule New Interview'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={selectedInterview?.jobTitle || newInterview.jobTitle || ''}
                onChange={(e) =>
                  selectedInterview
                    ? setSelectedInterview({
                        ...selectedInterview,
                        jobTitle: e.target.value,
                      })
                    : setNewInterview({ ...newInterview, jobTitle: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Candidate Name"
                value={selectedInterview?.candidateName || newInterview.candidateName || ''}
                onChange={(e) =>
                  selectedInterview
                    ? setSelectedInterview({
                        ...selectedInterview,
                        candidateName: e.target.value,
                      })
                    : setNewInterview({ ...newInterview, candidateName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Interviewer Name"
                value={selectedInterview?.interviewerName || newInterview.interviewerName || ''}
                onChange={(e) =>
                  selectedInterview
                    ? setSelectedInterview({
                        ...selectedInterview,
                        interviewerName: e.target.value,
                      })
                    : setNewInterview({ ...newInterview, interviewerName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Interview Date & Time"
                  value={
                    selectedInterview?.date
                      ? new Date(selectedInterview.date)
                      : newInterview.date
                      ? new Date(newInterview.date)
                      : null
                  }
                  onChange={(date) =>
                    selectedInterview
                      ? setSelectedInterview({
                          ...selectedInterview,
                          date: date || new Date(),
                        })
                      : setNewInterview({ ...newInterview, date: date || new Date() })
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Duration (minutes)"
                value={selectedInterview?.duration || newInterview.duration || 60}
                onChange={(e) =>
                  selectedInterview
                    ? setSelectedInterview({
                        ...selectedInterview,
                        duration: parseInt(e.target.value),
                      })
                    : setNewInterview({
                        ...newInterview,
                        duration: parseInt(e.target.value),
                      })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Interview Type</InputLabel>
                <Select
                  value={selectedInterview?.type || newInterview.type || 'online'}
                  label="Interview Type"
                  onChange={(e) =>
                    selectedInterview
                      ? setSelectedInterview({
                          ...selectedInterview,
                          type: e.target.value as 'online' | 'onsite',
                        })
                      : setNewInterview({
                          ...newInterview,
                          type: e.target.value as 'online' | 'onsite',
                        })
                  }
                >
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="onsite">On-site</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {(selectedInterview?.type === 'online' || newInterview.type === 'online') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meeting Link"
                  value={
                    selectedInterview?.meetingLink ||
                    newInterview.meetingLink ||
                    ''
                  }
                  onChange={(e) =>
                    selectedInterview
                      ? setSelectedInterview({
                          ...selectedInterview,
                          meetingLink: e.target.value,
                        })
                      : setNewInterview({
                          ...newInterview,
                          meetingLink: e.target.value,
                        })
                  }
                />
              </Grid>
            )}
            {(selectedInterview?.type === 'onsite' || newInterview.type === 'onsite') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={selectedInterview?.location || newInterview.location || ''}
                  onChange={(e) =>
                    selectedInterview
                      ? setSelectedInterview({
                          ...selectedInterview,
                          location: e.target.value,
                        })
                      : setNewInterview({
                          ...newInterview,
                          location: e.target.value,
                        })
                  }
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={selectedInterview?.notes || newInterview.notes || ''}
                onChange={(e) =>
                  selectedInterview
                    ? setSelectedInterview({
                        ...selectedInterview,
                        notes: e.target.value,
                      })
                    : setNewInterview({ ...newInterview, notes: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={selectedInterview ? handleUpdate : handleSchedule}
            variant="contained"
          >
            {selectedInterview ? 'Update' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InterviewScheduler; 
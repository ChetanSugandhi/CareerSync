import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Avatar,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns';
import { useApp } from '../../context/AppContext';
import ProfileEditor from '../profile/ProfileEditor';
import JobBrowser from '../jobs/JobBrowser';

const StudentDashboard = () => {
  const { user, applications, stats, loading } = useApp();
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [jobBrowserOpen, setJobBrowserOpen] = useState(false);

  const getStatusColor = (status: string): 'primary' | 'success' | 'error' | 'default' => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'primary';
      case 'shortlisted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              src={user?.avatar}
              sx={{ width: 100, height: 100, mb: 2 }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {user?.name || 'Loading...'}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user?.email || 'Loading...'}
            </Typography>
            <Divider sx={{ width: '100%', my: 2 }} />
            <List sx={{ width: '100%' }}>
              <ListItem>
                <ListItemText
                  primary="University"
                  secondary={user?.university || 'Not specified'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Course"
                  secondary={user?.course || 'Not specified'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Year"
                  secondary={user?.year || 'Not specified'}
                />
              </ListItem>
            </List>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
              onClick={() => setProfileEditorOpen(true)}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Applications Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">My Applications</Typography>
              <Button
                variant="outlined"
                startIcon={<WorkIcon />}
                onClick={() => setJobBrowserOpen(true)}
              >
                Browse Jobs
              </Button>
            </Box>
            <Grid container spacing={2}>
              {applications.map((application) => (
                <Grid item xs={12} key={application.id}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {application.position}
                          </Typography>
                          <Typography color="textSecondary" gutterBottom>
                            {application.company}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Applied on: {format(new Date(application.date), 'MMM d, yyyy')}
                          </Typography>
                        </Box>
                        <Chip
                          label={application.status}
                          color={getStatusColor(application.status)}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">Total Applications</Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">Shortlisted</Typography>
                <Typography variant="h4">{stats.shortlisted}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h4">{stats.pending}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Profile Editor Dialog */}
      <ProfileEditor
        open={profileEditorOpen}
        onClose={() => setProfileEditorOpen(false)}
      />

      {/* Job Browser Dialog */}
      {jobBrowserOpen && (
        <Dialog
          open={jobBrowserOpen}
          onClose={() => setJobBrowserOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Browse Jobs</DialogTitle>
          <DialogContent>
            <JobBrowser />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setJobBrowserOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default StudentDashboard; 
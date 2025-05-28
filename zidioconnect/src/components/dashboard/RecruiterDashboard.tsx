import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';

const RecruiterDashboard = () => {
  // Mock data - replace with actual data from your backend
  const companyProfile = {
    name: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    location: 'New York, NY',
    website: 'www.techsolutions.com',
  };

  const jobPostings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      type: 'Full-time',
      applications: 15,
      status: 'Active',
      postedDate: '2024-03-01',
    },
    {
      id: 2,
      title: 'UX Designer',
      type: 'Contract',
      applications: 8,
      status: 'Active',
      postedDate: '2024-03-10',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      name: 'Jane Smith',
      position: 'Senior Software Engineer',
      status: 'New',
      appliedDate: '2024-03-15',
    },
    {
      id: 2,
      name: 'Mike Johnson',
      position: 'UX Designer',
      status: 'Reviewed',
      appliedDate: '2024-03-14',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Company Profile */}
        <Box sx={{ width: { xs: '100%', md: '33%' } }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
              <BusinessIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {companyProfile.name}
            </Typography>
            <Divider sx={{ width: '100%', my: 2 }} />
            <List sx={{ width: '100%' }}>
              <ListItem>
                <ListItemText
                  primary="Industry"
                  secondary={companyProfile.industry}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Location"
                  secondary={companyProfile.location}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Website"
                  secondary={companyProfile.website}
                />
              </ListItem>
            </List>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Edit Company Profile
            </Button>
          </Paper>
        </Box>

        {/* Job Postings */}
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Active Job Postings</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Post New Job
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {jobPostings.map((job) => (
                <Card key={job.id}>
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
                          {job.title}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {job.type} • Posted on {job.postedDate}
                        </Typography>
                        <Chip
                          label={`${job.applications} Applications`}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      <Box>
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Recent Applications */}
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Applications
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {recentApplications.map((application) => (
                <Box key={application.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{application.name}</Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {application.position}
                      </Typography>
                      <Typography variant="body2">
                        Applied on: {application.appliedDate}
                      </Typography>
                      <Chip
                        label={application.status}
                        color={application.status === 'New' ? 'primary' : 'default'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small">View Profile</Button>
                      <Button size="small">Review Application</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Quick Stats */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(33.33% - 16px)' } }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">Active Jobs</Typography>
                <Typography variant="h4">5</Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(33.33% - 16px)' } }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">Total Applications</Typography>
                <Typography variant="h4">23</Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(33.33% - 16px)' } }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">Pending Review</Typography>
                <Typography variant="h4">8</Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RecruiterDashboard; 
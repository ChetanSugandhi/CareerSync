import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

interface Resume {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
  isDefault: boolean;
  skills: string[];
  experience: string;
  education: string;
}

const ResumeManager: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [newResume, setNewResume] = useState<Partial<Resume>>({
    title: '',
    skills: [],
    experience: '',
    education: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const { user } = useApp();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/resumes');
      setResumes(response.data);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
      setError('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !newResume.title) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', newResume.title);
      formData.append('skills', JSON.stringify(newResume.skills));
      formData.append('experience', newResume.experience || '');
      formData.append('education', newResume.education || '');

      const response = await axios.post(
        'http://localhost:5000/api/resumes',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        await fetchResumes();
        setUploadDialogOpen(false);
        setNewResume({});
        setFile(null);
      } else {
        setError('Failed to upload resume');
      }
    } catch (error) {
      console.error('Failed to upload resume:', error);
      setError('Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/api/resumes/${resumeId}`
      );

      if (response.status === 200) {
        await fetchResumes();
      } else {
        setError('Failed to delete resume');
      }
    } catch (error) {
      console.error('Failed to delete resume:', error);
      setError('Failed to delete resume');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (resumeId: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/resumes/${resumeId}/default`
      );

      if (response.status === 200) {
        await fetchResumes();
      } else {
        setError('Failed to set default resume');
      }
    } catch (error) {
      console.error('Failed to set default resume:', error);
      setError('Failed to set default resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (resumeId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/resumes/${resumeId}/download`,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'resume.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Failed to download resume:', error);
      setError('Failed to download resume');
    }
  };

  const handleEdit = async () => {
    if (!selectedResume) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/resumes/${selectedResume.id}`,
        selectedResume
      );

      if (response.status === 200) {
        await fetchResumes();
        setEditDialogOpen(false);
      } else {
        setError('Failed to update resume');
      }
    } catch (error) {
      console.error('Failed to update resume:', error);
      setError('Failed to update resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Resume Management</Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setUploadDialogOpen(true)}
        >
          Upload New Resume
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
            {resumes.map((resume) => (
              <ListItem key={resume.id}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {resume.title}
                      {resume.isDefault && (
                        <Chip label="Default" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Uploaded: {new Date(resume.uploadDate).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {resume.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDownload(resume.id)}
                    sx={{ mr: 1 }}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setSelectedResume(resume);
                      setEditDialogOpen(true);
                    }}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleSetDefault(resume.id)}
                    sx={{ mr: 1 }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDelete(resume.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>Upload New Resume</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Resume Title"
            value={newResume.title}
            onChange={(e) => setNewResume({ ...newResume, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Skills (comma-separated)"
            value={newResume.skills?.join(', ')}
            onChange={(e) =>
              setNewResume({
                ...newResume,
                skills: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Experience"
            value={newResume.experience}
            onChange={(e) =>
              setNewResume({ ...newResume, experience: e.target.value })
            }
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Education"
            value={newResume.education}
            onChange={(e) =>
              setNewResume({ ...newResume, education: e.target.value })
            }
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Choose File
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {file.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!file || !newResume.title}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Resume</DialogTitle>
        <DialogContent>
          {selectedResume && (
            <>
              <TextField
                fullWidth
                label="Resume Title"
                value={selectedResume.title}
                onChange={(e) =>
                  setSelectedResume({ ...selectedResume, title: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Skills (comma-separated)"
                value={selectedResume.skills.join(', ')}
                onChange={(e) =>
                  setSelectedResume({
                    ...selectedResume,
                    skills: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Experience"
                value={selectedResume.experience}
                onChange={(e) =>
                  setSelectedResume({
                    ...selectedResume,
                    experience: e.target.value,
                  })
                }
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="Education"
                value={selectedResume.education}
                onChange={(e) =>
                  setSelectedResume({
                    ...selectedResume,
                    education: e.target.value,
                  })
                }
                margin="normal"
                multiline
                rows={4}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResumeManager; 
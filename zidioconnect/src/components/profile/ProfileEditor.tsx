import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

interface ProfileEditorProps {
  open: boolean;
  onClose: () => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ open, onClose }) => {
  const { user, updateProfile, uploadAvatar } = useApp();
  const [formData, setFormData] = useState<Partial<UserProfile>>(user || {});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(formData);
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        await uploadAvatar(file);
      } catch (error) {
        console.error('Failed to upload avatar:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Box position="relative">
              <Avatar
                src={user?.avatar}
                sx={{ width: 100, height: 100, mb: 1 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  color="primary"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Typography variant="caption" color="textSecondary">
              Click the camera icon to change your profile picture
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="University"
            name="university"
            value={formData.university || ''}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Course"
            name="course"
            value={formData.course || ''}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={formData.year || ''}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileEditor; 
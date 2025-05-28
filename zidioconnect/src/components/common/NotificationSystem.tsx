import React, { useState, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

interface Notification {
  id: string;
  type: 'application' | 'message' | 'interview' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationSystem: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useApp();

  useEffect(() => {
    // Subscribe to WebSocket for real-time notifications
    // const ws = new WebSocket(process.env.REACT_APP_WS_URL || 'ws://localhost:8080'); // Keep WebSocket for future implementation, focusing on REST for now
    
    // ws.onmessage = (event) => {
    //   const notification = JSON.parse(event.data);
    //   setNotifications(prev => [notification, ...prev]);
    // };

    // Load existing notifications
    fetchNotifications();

    return () => {
      // ws.close();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      // Replace fetch with axios
      const response = await axios.get('http://localhost:5000/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // Replace fetch with axios
      await axios.post(
        `http://localhost:5000/api/notifications/${notificationId}/read`
      );
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <WorkIcon />;
      case 'message':
        return <EmailIcon />;
      case 'interview':
        return <EventIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: 360,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ width: '100%' }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <ListItem
                key={notification.id}
                button
                onClick={() => markAsRead(notification.id)}
                sx={{
                  backgroundColor: notification.read ? 'inherit' : 'action.hover',
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {notification.message}
                      </Typography>
                      <br />
                      <Typography component="span" variant="caption" color="text.secondary">
                        {new Date(notification.timestamp).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Menu>
    </>
  );
};

export default NotificationSystem; 
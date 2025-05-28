import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useApp } from '../../context/AppContext';
import axios from 'axios';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: Message;
}

const MessageSystem: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { user } = useApp();

  useEffect(() => {
    fetchConversations();
    // Subscribe to WebSocket for real-time messages
    // const ws = new WebSocket(process.env.REACT_APP_WS_URL || 'ws://localhost:8080'); // Keep WebSocket for future implementation, focusing on REST for now
    
    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   if (message.conversationId === selectedConversation) {
    //     setMessages(prev => [...prev, message]);
    //   }
    //   // Update conversation list with new message
    //   updateConversationList(message);
    // };

    return () => {
      // ws.close();
    };
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      // Replace fetch with axios
      const response = await axios.get('http://localhost:5000/api/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      setLoading(true);
      // Replace fetch with axios
      const response = await axios.get(
        `http://localhost:5000/api/conversations/${conversationId}/messages`
      );
      setMessages(response.data);
      scrollToBottom();
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    fetchMessages(conversationId);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      // Replace fetch with axios
      const response = await axios.post(
        'http://localhost:5000/api/messages',
        {
          conversationId: selectedConversation,
          content: newMessage,
        }
      );

      if (response.status === 201) { // Assuming 201 Created for success
        // Optionally update local state with the new message if needed before refetching
        setNewMessage('');
        // Consider refetching messages or appending the new message from response
        // For simplicity, let's refetch messages for now
        fetchMessages(selectedConversation);
        updateConversationList(response.data); // Assuming backend returns the created message
        scrollToBottom();
      } else {
        console.error('Failed to send message: Invalid status code', response.status);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const updateConversationList = (message: Message) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === message.conversationId
          ? { ...conv, lastMessage: message } // Update last message for the conversation
          : conv
      ).sort((a, b) => { // Optional: sort conversations by last message timestamp
        const dateA = a.lastMessage?.timestamp ? new Date(a.lastMessage.timestamp).getTime() : 0;
        const dateB = b.lastMessage?.timestamp ? new Date(b.lastMessage.timestamp).getTime() : 0;
        return dateB - dateA; // Sort in descending order
      })
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== user?.id);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Conversations List */}
      <Paper sx={{ width: 300, borderRight: 1, borderColor: 'divider' }}>
        <List>
          {conversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation);
            return (
              <ListItem
                key={conversation.id}
                button
                selected={conversation.id === selectedConversation}
                onClick={() => handleConversationSelect(conversation.id)}
              >
                <ListItemAvatar>
                  <Avatar src={otherParticipant?.avatar}>
                    {otherParticipant?.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={otherParticipant?.name}
                  secondary={conversation.lastMessage?.content}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>

      {/* Messages Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedConversation ? (
          <>
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {loading ? (
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress />
                </Box>
              ) : (
                messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.senderId === user?.id ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        backgroundColor: message.senderId === user?.id ? 'primary.light' : 'grey.100',
                      }}
                    >
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(message.timestamp).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Box>
                ))
              )}
              <div ref={messagesEndRef} />
            </Box>
            <Divider />
            <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Select a conversation to start messaging
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessageSystem; 
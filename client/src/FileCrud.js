// client/src/FileCrud.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';

const API_URL = 'http://localhost:5000/files';

function FileCrud() {
  const [filename, setFilename] = useState('');
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');

  const handleResponse = (message) => {
    setResponse(message);
    setTimeout(() => setResponse(''), 3000);  // Clears message after 3 seconds
  };

  const createFile = async () => {
    try {
      const res = await axios.post(API_URL, { filename, content });
      handleResponse(res.data.message);
    } catch (err) {
      handleResponse(err.response.data.error);
    }
  };

  const readFile = async () => {
    try {
      const res = await axios.get(`${API_URL}/${filename}`);
      handleResponse(res.data.content);
    } catch (err) {
      handleResponse(err.response.data.error);
    }
  };

  const updateFile = async () => {
    try {
      const res = await axios.put(`${API_URL}/${filename}`, { content });
      handleResponse(res.data.message);
    } catch (err) {
      handleResponse(err.response.data.error);
    }
  };

  const deleteFile = async () => {
    try {
      const res = await axios.delete(`${API_URL}/${filename}`);
      handleResponse(res.data.message);
    } catch (err) {
      handleResponse(err.response.data.error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: '20px auto' }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        File CRUD Operations
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mb={2}>
        <TextField
          label="Filename"
          variant="outlined"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          fullWidth
        />
        <TextField
          label="File Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary" onClick={createFile}>Create</Button>
        <Button variant="contained" color="secondary" onClick={readFile}>Read</Button>
        <Button variant="contained" color="info" onClick={updateFile}>Update</Button>
        <Button variant="contained" color="error" onClick={deleteFile}>Delete</Button>
      </Box>

      {response && (
        <Alert severity="info" onClose={() => setResponse('')}>
          {response}
        </Alert>
      )}
    </Paper>
  );
}

export default FileCrud;

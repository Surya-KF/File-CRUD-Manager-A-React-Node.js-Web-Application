// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// File directory
const FILE_PATH = path.join(__dirname, 'files');

// Ensure the directory exists
if (!fs.existsSync(FILE_PATH)) {
  fs.mkdirSync(FILE_PATH);
}

// Create a new file
app.post('/files', (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(FILE_PATH, filename);

  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).json({ error: 'File creation failed' });
    res.json({ message: 'File created successfully' });
  });
});

// Read a file
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(FILE_PATH, req.params.filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.json({ content: data });
  });
});

// Update a file
app.put('/files/:filename', (req, res) => {
  const filePath = path.join(FILE_PATH, req.params.filename);
  const { content } = req.body;

  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).json({ error: 'File update failed' });
    res.json({ message: 'File updated successfully' });
  });
});

// Delete a file
app.delete('/files/:filename', (req, res) => {
  const filePath = path.join(FILE_PATH, req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.json({ message: 'File deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

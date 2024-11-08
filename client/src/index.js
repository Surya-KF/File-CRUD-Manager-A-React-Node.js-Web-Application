// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' for createRoot
import './index.css';  // Optional: Styling for the application
import App from './App';

// Find the root element in the HTML
const rootElement = document.getElementById('root');

// Create a root and render the App component into it
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

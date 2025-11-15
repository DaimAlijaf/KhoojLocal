const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Register endpoint (mock for now)
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Mock success response (in production, save to database)
  console.log('New registration:', { name, email });
  res.status(201).json({
    message: 'Registration successful',
    user: { name, email }
  });
});

// Login endpoint (mock for now)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Mock success (in production, verify credentials from database)
  console.log('Login attempt:', email);
  res.json({
    message: 'Login successful',
    user: { email, name: email.split('@')[0] }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = 'your_jwt_secret_key';
let users = {};

router.post('/register', (req, res) => {
  console.log('Registering user:', req.body);
  const { username, password } = req.body;
  if (users[username]) return res.status(400).json({ error: 'User already exists' });

  users[username] = password;
  res.json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;

import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from './userModel.js';

const router = express.Router();

// 🔐 Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // remove "BEARER "

  if (!token) {
    return res.status(401).json({ success: false, msg: 'Missing token' });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, msg: 'Invalid token' });
    }
    req.user = user; // { username: ... }
    next();
  });
}

// 🧪 Dev route: Get all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
}));

// 📦 Register or Authenticate user
router.post('/', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, msg: 'Username and password are required.' });
  }

  if (req.query.action === 'register') {
    return await registerUser(req, res);
  } else {
    return await authenticateUser(req, res);
  }
}));

// ✅ Register a new user
async function registerUser(req, res) {
  const { username, password } = req.body;

  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      msg: "Password must be at least 8 characters long and include a letter, a digit, and a special character."
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ success: false, msg: 'Username already exists.' });
  }

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).json({ success: true, msg: 'User registered successfully.' });
  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ success: false, msg: 'Server error while registering user.' });
  }
}

// 🔑 Authenticate user and return token
async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
    return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
  }

  const isMatch = await user.comparePassword(String(req.body.password));
  if (isMatch) {
    const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token: 'BEARER ' + token });
  } else {
    return res.status(401).json({ success: false, msg: 'Wrong password.' });
  }
}

// — Removed these two routes entirely —
// router.get('/:username/favorites', ...)
// router.post('/:username/favorites', ...)

export default router;

const authService = require('../services/auth.service');

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.signup(email, password);
    res.status(201).json({ token });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (!token) return res.status(401).json({ error: 'Invalid email or password' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login };

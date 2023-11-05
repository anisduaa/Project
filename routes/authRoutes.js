const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('../models/Employee');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employee = new EmployeeModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedEmployee = await employee.save();
    res.json({ employee: savedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await EmployeeModel.findOne({ email });
    if (!employee) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: '9000h',
    });

    res.json({ employee, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Optionally, you can perform any necessary cleanup or session handling here.
  // For example, if you're using sessions, you might want to destroy the session.

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;

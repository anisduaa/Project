const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Use the express-session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with your actual secret key
    resave: false,
    saveUninitialized: true,
  })
);
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(process.env.PORT || 3005, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3005}`
  );
});

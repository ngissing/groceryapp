const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// More explicit .env loading
const result = require('dotenv').config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Environment file loaded successfully');
  console.log('Loaded variables:', {
    hasEmailUser: !!process.env.EMAIL_USER,
    hasAppPassword: !!process.env.EMAIL_APP_PASSWORD
  });
}

// Import all models
require('./src/models/User');
require('./src/models/Meal');
require('./src/models/MealPlan');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const mealPlanRoutes = require('./src/routes/mealPlanRoutes');
const emailRoutes = require('./src/routes/emailRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/email', emailRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
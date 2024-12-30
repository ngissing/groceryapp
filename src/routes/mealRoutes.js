// src/routes/mealRoutes.js
const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const authenticateToken = require('../middleware/auth');

// Get all meals for logged in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.user.userId });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meals' });
    }
});

// Create a new meal
router.post('/', authenticateToken, async (req, res) => {
    try {
        const meal = new Meal({
            userId: req.user.userId,
            name: req.body.name,
            ingredients: req.body.ingredients
        });
        const savedMeal = await meal.save();
        res.status(201).json(savedMeal);
    } catch (error) {
        res.status(500).json({ message: 'Error creating meal' });
    }
});

// Add this route to handle meal deletion
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const meal = await Meal.findOneAndDelete({ 
            _id: req.params.id,
            userId: req.user.userId 
        });
        
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        
        res.json({ message: 'Meal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting meal' });
    }
});

// Add this route to handle meal updates
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const meal = await Meal.findOne({ 
            _id: req.params.id,
            userId: req.user.userId 
        });

        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        meal.name = req.body.name;
        meal.ingredients = req.body.ingredients;

        const updatedMeal = await meal.save();
        res.json(updatedMeal);
    } catch (error) {
        res.status(500).json({ message: 'Error updating meal' });
    }
});

module.exports = router;
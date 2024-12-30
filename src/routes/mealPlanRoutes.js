const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MealPlan = mongoose.model('MealPlan');
const authenticateToken = require('../middleware/auth');

// Get all meal plans for user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const mealPlans = await MealPlan.find({ userId: req.user.userId })
            .sort({ weekOf: -1 }); // Sort by date, newest first
        res.json(mealPlans);
    } catch (error) {
        console.error('Error fetching meal plans:', error);
        res.status(500).json({ message: 'Error fetching meal plans' });
    }
});

// Create a meal plan
router.post('/', authenticateToken, async (req, res) => {
    try {
        console.log('Creating meal plan with data:', {
            userId: req.user.userId,
            weekOf: req.body.weekOf,
            meals: req.body.meals
        });

        const mealPlan = new MealPlan({
            userId: req.user.userId,
            weekOf: req.body.weekOf,
            meals: req.body.meals.map(meal => ({
                mealId: meal.mealId,
                mealName: meal.mealName,
                day: meal.day
            }))
        });
        
        const savedMealPlan = await mealPlan.save();
        console.log('Meal plan saved successfully:', savedMealPlan);
        res.status(201).json(savedMealPlan);
    } catch (error) {
        console.error('Error creating meal plan:', error);
        res.status(500).json({ 
            message: 'Error creating meal plan',
            error: error.message 
        });
    }
});

// Update a meal plan
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const mealPlan = await MealPlan.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }

        mealPlan.weekOf = req.body.weekOf;
        mealPlan.meals = req.body.meals.map(meal => ({
            mealId: meal.mealId,
            mealName: meal.mealName,
            day: meal.day
        }));

        const updatedMealPlan = await mealPlan.save();
        res.json(updatedMealPlan);
    } catch (error) {
        console.error('Error updating meal plan:', error);
        res.status(500).json({ message: 'Error updating meal plan' });
    }
});

// Delete a meal plan
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const mealPlan = await MealPlan.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }

        res.json({ message: 'Meal plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting meal plan:', error);
        res.status(500).json({ message: 'Error deleting meal plan' });
    }
});

module.exports = router;
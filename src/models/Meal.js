// src/models/Meal.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true }
    }]
});

module.exports = mongoose.model('Meal', mealSchema);
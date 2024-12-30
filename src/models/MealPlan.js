const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weekOf: {
        type: Date,
        required: true
    },
    meals: [{
        mealId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal'
        },
        mealName: String,
        day: String
    }]
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
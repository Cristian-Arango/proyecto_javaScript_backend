const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title Required"],
        maxlength: [20, "The title must have 20 characters!"],
    },
    text: {
        type: String,
        required: [true, "Text Required"],
        maxlength: [50, "The text must have max. 50 characters! "]
    },
    rating: {
        type: Number,
        required: [true, "The rating is required"],
        max: [10, "The rating should be between 1 and 10"]
    },
    bootcamp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bootcamp', // Referencia al modelo Bootcamp
        required: [true, "The BootcampId is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Referencia al modelo Bootcamp
        required: [true, "The userID is required"]
    },
    // Otros campos si es necesario
});

const Reviews = mongoose.model("Reviews", ReviewsSchema);

module.exports = Reviews;

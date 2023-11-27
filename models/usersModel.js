const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Required"],
        maxlength: [40, "The name must have 40 characters!"],
    
    },
    last_name: {
        type: String,
        required: [true, "Last Name Required"],
        maxlength: [40, "The last name must have 40 characters!"],
    
    },

    age:{
        type:Number,
        required: [true, "The age is required"],
        max: [99, "The age should be between 1 and 99"]
    }
});

const user = mongoose.model("users", userSchema);

module.exports = user;

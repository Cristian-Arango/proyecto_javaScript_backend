const mongoose = require('mongoose')

//Define a module that only works with Mongoose
const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required : [true , "nombre requerido"],
        maxlength: [20 , "The name must have 20 characters!"]
    },
    phone: {
        type: Number,
        required : [true , "telefono requerido"],
        maxlength: [9999999999 , "The phone number, must have 10 characters"]
    },
    address: {
        type: String,
        required : [true , "The adress is required"]
    },
    topics: {
        type: [String],
        enum: [ "AI", 
        "Backend Development", 
        "Frontend", 
        "Devops" 
    ]
    },
    averageRating: Number,

    createdAt: {
        type: Date,
        required: [true , "The creation date must be added"]
    }
})

const Bootcamp = mongoose.model("Bootcamp",bootcampSchema)

module.exports = Bootcamp
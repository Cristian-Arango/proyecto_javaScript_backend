const mongoose = require("mongoose");

//Define a module that only works with Mongoose
const CoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Requiered"],
    maxlength: [30, "The title must have 20 characters!"],
    minlength: [10, "The title must have min. 10 characters! "],
  },
  description: {
    type: String,
    required: [true, "Description Requiered"],
    minlength: [10, "The description must have min. 10 characters! "],
  },
  weeks: {
    type: Number,
    required: [true, "The adress is required"],
    max: [9, "The number Max of weeks is 9"],
  },
  enroll_cost: {
    type: Number,
    required: [true, "The enroll_cost is required"],
  },

  minimum_skill: {
    type: [String],
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
  },
});

const Courses = mongoose.model("Courses", CoursesSchema);

module.exports = Courses;

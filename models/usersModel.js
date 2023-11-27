const bycryptjs = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Required"],
    maxlength: [40, "The name must have 40 characters!"],
  },
  email: {
    type: String,
  },

  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const sal = await bycryptjs.genSalt(3);

  this.password = await bycryptjs.hash(this.password, sal);
});

userSchema.methods.compararPassword = async function (password) {
  return await bycryptjs.compare(password, this.password);
};

const user = mongoose.model("users", userSchema);

module.exports = user;

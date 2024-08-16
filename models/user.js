const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

User.pre("save", async (next) => {
  if (!this.isModified(password)) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.email = this.email.toLowerCase();
});

User.methods.matchPassword(async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
});

module.exports = User;

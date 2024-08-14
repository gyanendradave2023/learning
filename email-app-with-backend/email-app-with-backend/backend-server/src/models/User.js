const mongoose = require('mongoose');
// Import the validator package to use for email validation
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    // Use the validate option to apply the validator.isEmail function
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
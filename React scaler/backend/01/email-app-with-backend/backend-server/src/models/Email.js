const mongoose = require('mongoose');
const validator = require('validator');

const EmailSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Email', EmailSchema);
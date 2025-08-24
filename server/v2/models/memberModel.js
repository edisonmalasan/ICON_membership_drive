const mongoose = require('mongoose');

// Member Schema (shared between routes)
const memberSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: function(value){
      return this.emailRequired;
    },
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6
  },
  role:{
    type: String,
    required: true,
    enum: ['admin', 'member'],
    default: 'member'
  },
  emailRequired: {
    type: Boolean,
    default: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Member', memberSchema);
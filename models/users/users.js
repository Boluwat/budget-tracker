const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    mobile: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { strict: 'throw', timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = {
  User,
};

/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

async function validateUser(val) {
  const User = mongoose.model('User');
  try {
    const user = await User.findById(val).lean().exec();
    return Boolean(user);
  } catch (ex) {
    return false;
  }
}

module.exports = {
  validateUser,
};

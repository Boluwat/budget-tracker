/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

async function validateCategory(val) {
  const Category = mongoose.model("Category");
  try {
    const category = await Category.findById(val).lean().exec();
    return Boolean(category);
  } catch (ex) {
    return false;
  }
}

module.exports = {
  validateCategory,
};

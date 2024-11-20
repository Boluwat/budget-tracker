/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

async function validateTransactions(val) {
  const Transactions = mongoose.model("Transactions");
  try {
    const transactions = await Transactions.findById(val).lean().exec();
    return Boolean(transactions);
  } catch (ex) {
    return false;
  }
}

module.exports = {
  validateTransactions,
};

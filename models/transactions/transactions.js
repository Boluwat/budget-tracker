const mongoose = require("mongoose");
const { validateUser } = require("../users/validate");
const { validateCategory } = require("../categories/validate");

const transactionSchema = new mongoose.Schema(
  {
    budget: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
      validate: validateUser,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
      validate: validateCategory,
    },
  },
  { strict: "throw", timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = {
  Transaction,
};

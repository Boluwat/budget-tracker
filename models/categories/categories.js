const mongoose = require("mongoose");
const { validateUser } = require("../users/validate");

const categorySchema = new mongoose.Schema(
  {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
      validate: validateUser,
    },
  },
  { strict: "throw", timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = {
  Category,
};

const mongoose = require("mongoose");
const logger = require("./logger");
require("dotenv").config();

const initDB = async () => {
  try {
    const mongodbUrl = process.env.DB_HOST;
    mongoose.connect(mongodbUrl, { useNewUrlParser: true }).then(() =>
      logger.log({
        level: "info",
        message: "connected to databse",
      })
    );
  } catch (error) {
    logger.log({
      level: "error",
      message: error,
    });
  }
};

module.exports = { initDB };

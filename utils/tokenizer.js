const jwt = require('jsonwebtoken');
const logger = require('./logger');
require('dotenv').config();

module.exports = {
  async sign(data) {
    return await jwt.sign(data, process.env.JWT_SEC, { expiresIn: '24h' });
  },
  async verify(token) {
    try {
      return await jwt.verify(token, process.env.JWT_SEC);
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      });
    }
  },
};

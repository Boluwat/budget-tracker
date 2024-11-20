const Hapi = require('@hapi/hapi');
const logger = require('./utils/logger');
const authStrategies = require('./utils/authStrategies');
const registeredPlugins = require('./utils/registeredPluggins');
const registeredBaseRoutes = require('./utils/registeredBaseRoute');

async function startServer({ services } = {}) {
  try {
    const server = new Hapi.Server({
      port: 3000,
      host: 'localhost',
    });
    server.app.services = services;
    await registeredPlugins(server);
    authStrategies(server);
    registeredBaseRoutes(server);
    await server.start();
    logger.log({
      level: 'info',
      message: `%s %s server is runnung ${server.info.port}...`,
    });
    return server;
  } catch (error) {
    logger.log({
      level: 'error',
      message: error,
    });
    return null;
  }
}

module.exports = { startServer };

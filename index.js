const logger = require('./utils/logger');
const { startServer } = require('./app');
const { initDB } = require('./utils/database');

async function setup() {
  try {
    await initDB();
    const { createServices } = require('./services/service-factory');
    const services = createServices();
    await startServer({
      services,
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: `failed to start server:::::${error}`,
    });
  }
}

setup();

const authBearer = require("hapi-auth-bearer-token");

module.exports = async (server) => {
  await server.register([authBearer]);
};

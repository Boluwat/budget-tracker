const {verify} = require('./tokenizer');

module.exports = (server) => {
    server.auth.strategy('simple', 'bearer-access-token', {
      validate: async (request, token) => {
        const isValid = await verify(token);
        const credentials = { token };
        return { isValid, credentials };
      },
    });
  };
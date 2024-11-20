const Boom = require('@hapi/boom');

const error = (statusCode, message) => {
  if (statusCode === 400) {
    return Boom.badRequest(message);
  }
  if (statusCode === 404) {
    return Boom.notFound(message);
  }
  if (statusCode === 401) {
    return Boom.unauthorized(message);
  }
  if (statusCode === 403) {
    return Boom.forbidden(message);
  }
};

module.exports = {
  error,
};

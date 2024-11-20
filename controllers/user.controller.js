const { error } = require("../utils/error");

const signInCustomUser = async (request, reply) => {
  const response = await request.server.app.services.users.signInUser(
    request.payload
  );
  if (response.error) {
    if (response.error.activated === false) {
      return reply.response(response.error).code(403);
    }
    return error(401, response.error);
  }

  return response;
};

const createUser = async (request) => {
  const user = request.payload;

  const response = await request.server.app.services.users.signUpUser(user);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const activateUser = async (request) => {
  const { userId, token } = request.params;
  const response = await request.server.app.services.users.activateUser(
    userId,
    token
  );
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

module.exports = {
  activateUser,
  signInCustomUser,
  createUser,
};

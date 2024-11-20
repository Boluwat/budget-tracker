const { userApi, categoryAPI } = require("../api");

module.exports = (server) => {
  userApi(server, "/v1/user");
  categoryAPI(server, "/v1/categories");
};

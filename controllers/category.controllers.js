const { error } = require("../utils/error");
// const constants = require("../utils/constant");
const { verify } = require("../utils/tokenizer");

const create = async (request) => {
  const { payload } = request;
  const { user } = await verify(request.auth.credentials.token);
  const response = await request.server.app.services.categories.createCategory(
    payload,
    user
  );
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const getCategory = async (request) => {
  const { id } = request.params;
  const { user } = await verify(request.auth.credentials.token);
  const response = await request.server.app.services.categories.getCategory(
    id,
    user
  );
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const getAllCategory = async (request) => {
  const { query } = request;
  const categories = await request.server.app.services.categories.getAll(query);
  const response = {
    count: categories.value ? categories.value.length : 0,
    category: categories.value,
  };
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const deactivateCategory = async (request) => {
  const { id } = request.params;
  const { user } = await verify(request.auth.credentials.token);
  const response = await request.server.app.services.categories.deactivate(
    id,
    user
  );
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const updateCategories = async (request) => {
  const { id } = request.params;
  const { payload } = request;
  const { user } = await verify(request.auth.credentials.token);
  const response = await request.server.app.services.categories.editCategory(
    id,
    payload,
    user
  );
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

module.exports = {
  create,
  getCategory,
  getAllCategory,
  deactivateCategory,
  updateCategories,
};

const Joi = require("joi");
const namespace = require("hapijs-namespace");

const { categoryControllers } = require("../controllers");

module.exports = (server, prefix) => {
  namespace(server, prefix, [
    {
      method: "Post",
      path: "/categories",
      config: {
        description: "create category",
        tags: ["api", "category"],
        auth: 'simple',
        validate: {
          payload: Joi.object({
            value: Joi.string()
              .required()
              .lowercase(),
            label: Joi.string().required().lowercase(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: categoryControllers.create,
      },
    },
    {
        method: 'Get',
        path: '/{id}',
        config: {
          description: 'get a category',
          tags: ['api', 'categories'],
          auth: 'simple',
          validate: {
            params: Joi.object({
              id: Joi.string().max(24).min(24).required(),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
          handler: categoryControllers.getCategory,
        },
      },
      {
        method: 'Patch',
        path: '/{id}',
        config: {
          description: 'update a category',
          tags: ['api', 'categories'],
          auth: 'simple',
          validate: {
            params: Joi.object({
              id: Joi.string().max(24).min(24).required(),
            }),
            payload: Joi.object({
              value: Joi.string()
                .required()
                .lowercase(),
              label: Joi.string().required().lowercase(),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
          handler: categoryControllers.updateCategories,
        },
      },
      {
        method: 'Get',
        path: '/',
        config: {
          description: 'get all categories',
          tags: ['api', 'categories'],
          validate: {
            query: Joi.object({
              limit: Joi.number().description('max number  to be fetch'),
              offset: Joi.number().description('number of items to be skipped'),
              status: Joi.string().description('status of the category'),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
          handler: categoryControllers.getAllCategory,
        },
      },
  ]);
};

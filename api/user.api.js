const Joi = require("joi");
const namespace = require("hapijs-namespace");

const { userControllers } = require("../controllers");

module.exports = (server, prefix) => {
  namespace(server, prefix, [
    {
      method: "Post",
      path: "/login",
      config: {
        description: "sign in",
        tags: ["api", "user"],
        validate: {
          payload: Joi.object({
            userEmailMobile: Joi.string()
              .required()
              .lowercase()
              .trim()
              .prefs({ convert: true }),
            password: Joi.string().required(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: userControllers.signInCustomUser,
      },
    },
    {
      method: "Post",
      path: "/sign-up",
      config: {
        description: "sign up",
        tags: ["api", "user"],
        validate: {
          payload: Joi.object({
            email: Joi.string()
              .email()
              .required()
              .lowercase()
              .trim()
              .prefs({ convert: true }),
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            password: Joi.string().required(),
            mobile: Joi.string().required(),
            gender: Joi.string().valid('MALE', 'FEMALE')
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: userControllers.createUser,
      },
    },
    {
        method: 'Get',
        path: '/activate/{userId}/{token}/user',
        config: {
          description: 'activate account',
          tags: ['api', 'user'],
          validate: {
            params: Joi.object({
              token: Joi.number().description('token'),
              userId: Joi.string().max(24).min(24),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
          handler: userControllers.activateUser,
        },
      },
  ]);
};

const logger = require("../utils/logger");
const { Category } = require("../models/categories");
const constants = require("../utils/constant");

module.exports = {
  categoryService() {
    return {
      async createCategory(payload, user) {
        try {
          payload.user = user;
          const categoryExist = await Category.findOne({
            $or: [{ value: payload.value }, { label: payload.value }],
          });
          if (categoryExist) return { error: constants.EXIST };
          const categories = await Category.create(payload);
          return categories;
        } catch (ex) {
          logger.log({
            level: "error",
            message: ex,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async getCategory(categoryId) {
        try {
          const category = await Category.findById(categoryId);
          if (!category) {
            return {
              error: constants.NOT_FOUND,
            };
          }
          return category;
        } catch (ex) {
          logger.log({
            level: "error",
            message: ex,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async getAll({ offset = 0, limit = 100, status } = {}) {
        const query = {};
        if (status) {
          query.status = status;
        }
        const totalCounts = await Category.countDocuments(query);
        const value = await Category.find(query)
          .select()
          .skip(offset)
          .sort({ createdAt: -1 })
          .limit(limit);

        return {
          totalCounts,
          value,
        };
      },
      async deactivate(id) {
        try {
          const cat = await Category.findOneAndUpdate(
            {
              _id: id,
            },
            { status: 'INACTIVE' },
            { new: true },
          );
          if (!cat) return { error: constants.NOT_FOUND };
          return { msg: constants.SUCCESS };
        } catch (error) {
          logger.log({
            level: 'error',
            message: error,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async editCategory(id, payload) {
        try {
          const cat = await Category.findOneAndUpdate(
            {
              _id: id,
            },
            { payload },
            { new: true },
          );
          if (!cat) return { error: constants.NOT_FOUND };
          return { msg: constants.SUCCESS };
        } catch (error) {
          logger.log({
            level: 'error',
            message: error,
          });
          return { error: constants.GONE_BAD };
        }
      },
    };
  },
};

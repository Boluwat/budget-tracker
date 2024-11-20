const {
    userService,
    categoryService,
  } = require('.');
  
  const createServices = () => ({
    users: userService(),
    categories: categoryService(),
  });
  
  module.exports = {
    createServices,
  };
  
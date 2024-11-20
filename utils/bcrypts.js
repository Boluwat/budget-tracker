const bcrypt = require("bcrypt");

const saltRound = 10;

module.exports = {
  hashManager() {
    return {
      async hash(password) {
        return await bcrypt.hash(password, saltRound);
      },
      async compare(password, hash) {
        return await bcrypt.compare(password, hash);
      },
    };
  },
};

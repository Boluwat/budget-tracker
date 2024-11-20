const logger = require("../utils/logger");
const { hashManager } = require("../utils/bcrypts");
const { sign } = require("../utils/tokenizer");
const { User } = require("../models/users");
const constants = require("../utils/constant");

async function getResponse(user) {
  user = user.toObject();
  const option = {};
  delete user.password;
  delete user.role;
  delete user.token;

  return {
    user,
    token: await sign({
      user: user._id,
      ...option,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    }),
  };
}

async function checkUserExist(user) {
  const userExist = await User.findOne({
    $or: [{ email: user.email }, { mobile: user.mobile }],
  });
  return userExist;
}

module.exports = {
  userService() {
    return {
      async signUpUser(user) {
        try {
          const validation = await checkUserExist(user);
          if (!validation) {
            const token =
              Math.floor(Math.random() * 90000) + constants.TOKEN_RANGE;
            user.token = token;
            if (!user.password) user.password = user.email;
            user.password = await hashManager().hash(user.password);
            const newUser = await User.create(user);
            return {
              msg: constants.SUCCESS,
              userId: newUser._id,
              token: user.token,
            };
          }
          return { error: constants.DUPLICATE_USER };
        } catch (ex) {
          logger.log({
            level: "error",
            message: ex,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async signInUser(user) {
        try {
          const dbUser = await User.findOne({
            $or: [
              { email: user.userEmailMobile },
              { mobile: user.userEmailMobile },
            ],
          });

          if (!dbUser) {
            return { error: constants.INVALID_USER };
          }
          const { _id } = dbUser;
          const validatePassword = await hashManager().compare(
            user.password,
            dbUser.password
          );
          if (dbUser && validatePassword) {
            if (!dbUser.activated) {
              const token =
                Math.floor(Math.random() * 90000) + constants.TOKEN_RANGE;
              await User.findOneAndUpdate(
                {
                  $or: [
                    { email: user.userEmailMobile },
                    { mobile: user.userEmailMobile },
                  ],
                },
                { token },
                { new: true }
              );
              return {
                error: {
                  activated: false,
                  userId: _id,
                  msg: constants.ACCOUNT_NOT_ACTIVATED,
                },
              };
            }
            await dbUser.save();
            return await getResponse(dbUser);
          }
          return {
            error: constants.INVALID_USER,
          };
        } catch (ex) {
          logger.log({
            level: "error",
            message: ex,
          });
          throw new Error(ex.message);
        }
      },
      async activateUser(userId, token) {
        try {
          if (!userId) return constants.NOT_FOUND;
          const updateUser = await User.findOneAndUpdate(
            {
              _id: userId,
              token,
              activated: false,
            },
            {
              activated: true,
            },
            {
              new: true,
            }
          );

          if (updateUser) {
            return await getResponse(updateUser);
          }
          return { error: constants.INVALID_TOKEN };
        } catch (ex) {
          logger.log({
            level: "error",
            message: ex,
          });
          return { error: constants.GONE_BAD };
        }
      },
    };
  },
};

const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const user =  sequelize.define(
    "chatapp", {
        username: {
            type: Sequelize.STRING,
        },
        msg: {
            type: Sequelize.STRING,
        }
    },{ }
);

(async () => {
    await user.sync({ force: false });
  })();

module.exports = user;

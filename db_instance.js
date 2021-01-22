const Sequelize = require("sequelize");
const sequelize = new Sequelize('test','root','',{
  dialect: "mysql",
  host: 'localhost',
});

(async () => {
    await sequelize.authenticate();
})();

module.exports = sequelize;
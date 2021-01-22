const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const product = sequelize.define(
    "customerdata",
    {      
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idcard: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cuswork: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cusnumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      empid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      empname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      team: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // date: {
      //   type: Sequelize.DATE,
      //   allowNull: false
      // }
    },
    {
      // options
    }
  );


(async () => {
  await product.sync({ force: false });    
})();

  
module.exports = product;

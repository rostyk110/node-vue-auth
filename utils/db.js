const Sequelize = require('sequelize');

const sequelize = new Sequelize('test_app', 'root', 'rostyk10', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tutorias', 'root', 'Root123', {
host: '127.0.0.1',
dialect: 'mysql',
});

module.exports = sequelize;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointment-app', 'root', 'server@Shashank', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = sequelize;
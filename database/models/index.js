const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

// Explicitly import models
const User = require('./user')(sequelize, Sequelize.DataTypes);

// Add models to the db object
db[User.name] = User;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

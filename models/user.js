'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User
      .hasMany(models.achievement)
      .hasMany(models.location)
      .hasMany(models.participation);
  };
  return User;
};

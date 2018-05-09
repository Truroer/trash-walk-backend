'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {},
  );
  User.associate = (models) => {
    User.hasMany(models.Achievement);
    User.hasMany(models.Location);
    User.hasMany(models.Participation);
  };
  return User;
};

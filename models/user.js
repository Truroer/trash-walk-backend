'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      token: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {},
  );
  User.associate = (models) => {
    User.hasMany(models.Achievement, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Location, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Participation, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};

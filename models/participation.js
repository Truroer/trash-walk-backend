'use strict';

module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define(
    'Participation',
    {
      user_id: DataTypes.UUID,
      event_id: DataTypes.UUID,
      distance: DataTypes.FLOAT,
    },
    {},
  );
  Participation.associate = (models) => {
    Participation.belongsTo(models.Event, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    Participation.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    Participation.hasMany(models.Comment);
    Participation.hasMany(models.Image);
  };
  return Participation;
};

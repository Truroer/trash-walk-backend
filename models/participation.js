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
    });
    Participation.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
    Participation.hasMany(models.Comment);
    Participation.hasMany(models.Image);
  };
  return Participation;
};

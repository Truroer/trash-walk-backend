'use strict';

module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define(
    'Participation',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      distance: DataTypes.FLOAT,
    },
    {},
  );
  Participation.associate = (models) => {
    Participation.belongsTo(models.Event, {
      onDelete: 'CASCADE',
      foreignKey: 'EventId',
    });
    Participation.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
    });
    Participation.hasMany(models.Comment, {
      foreignKey: 'ParticipationId',
      onDelete: 'CASCADE'
    });
    Participation.hasMany(models.Image, {
      foreignKey: 'ParticipationId',
      onDelete: 'CASCADE'
    });
  };
  return Participation;
};

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
      area: DataTypes.FLOAT,
      shape: DataTypes.GEOMETRY('POLYGON'),
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
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

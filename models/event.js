'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      active: DataTypes.BOOLEAN,
    },
    {},
  );
  Event.associate = (models) => {
    Event.hasMany(models.Location, {
      foreignKey: 'EventId',
      onDelete: 'CASCADE'
    });
    Event.hasMany(models.Participation, {
      foreignKey: 'EventId',
      onDelete: 'CASCADE'
    });
  };
  return Event;
};

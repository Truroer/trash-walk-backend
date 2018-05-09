'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      active: DataTypes.BOOLEAN,
    },
    {},
  );
  Event.associate = (models) => {
    Event.hasMany(models.Location);
    Event.hasMany(models.Participation);
  };
  return Event;
};

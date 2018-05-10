'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      geography: DataTypes.GEOMETRY('POINT', 4326),
      timestamp: DataTypes.DATE,
    },
    {},
  );
  Location.associate = (models) => {
    Location.belongsTo(models.Event, {
      onDelete: 'CASCADE',
      foreignKey: 'EventId',
    });
    Location.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
    });
  };
  return Location;
};

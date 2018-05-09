'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      user_id: DataTypes.UUID,
      event_id: DataTypes.UUID,
      geography: DataTypes.GEOMETRY,
    },
    {},
  );
  Location.associate = (models) => {
    Location.belongsTo(models.Event, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    Location.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Location;
};

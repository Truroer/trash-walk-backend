'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    user_id: DataTypes.UUID,
    event_id: DataTypes.UUID,
    geography: DataTypes.GEOMETRY
  }, {});
  Location.associate = (models) => {
    // associations can be defined here
  };
  return Location;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define('Participation', {
    user_id: DataTypes.UUID,
    event_id: DataTypes.UUID,
    distance: DataTypes.FLOAT
  }, {});
  Participation.associate = (models) => {
    // associations can be defined here
  };
  return Participation;
};

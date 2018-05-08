'use strict';

module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define('Achievement', {
    user_id: DataTypes.UUID,
    badges_id: DataTypes.UUID,
    date: DataTypes.DATE
  }, {});
  Achievement.associate = (models) => {
    // associations can be defined here
  };
  return Achievement;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Badge = sequelize.define('Badge', {
    achievements_id: DataTypes.UUID,
    badge: DataTypes.STRING
  }, {});
  Badge.associate = (models) => {
    // associations can be defined here
  };
  return Badge;
};

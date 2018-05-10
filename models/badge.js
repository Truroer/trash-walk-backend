'use strict';

module.exports = (sequelize, DataTypes) => {
  const Badge = sequelize.define(
    'Badge',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      badge: DataTypes.STRING,
    },
    {},
  );
  Badge.associate = (models) => {
    Badge.hasMany(models.Achievement, {
      foreignKey: 'BadgeId',
      onDelete: 'CASCADE'
    });
  };
  return Badge;
};

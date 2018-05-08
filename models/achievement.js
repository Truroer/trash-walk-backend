'use strict';

module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define('Achievement', {
    user_id: DataTypes.UUID,
    badges_id: DataTypes.UUID,
    date: DataTypes.DATE
  }, {});
  Achievement.associate = (models) => {
    Achievement
      .belongsTo(models.badge, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      .belongsTo(models.user, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      });
  };
  return Achievement;
};

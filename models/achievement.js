'use strict';

module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define(
    'Achievement',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      date: DataTypes.DATE,
    },
    {},
  );
  Achievement.associate = (models) => {
    Achievement.belongsTo(models.Badge, {
      onDelete: 'CASCADE',
      foreignKey: 'BadgeId',
    });
    Achievement.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
    });
  };
  return Achievement;
};

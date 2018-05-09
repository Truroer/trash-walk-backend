'use strict';

module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define(
    'Achievement',
    {
      user_id: DataTypes.UUID,
      badges_id: DataTypes.UUID,
      date: DataTypes.DATE,
    },
    {},
  );
  Achievement.associate = (models) => {
    Achievement.belongsTo(models.Badge, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    Achievement.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Achievement;
};

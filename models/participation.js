'use strict';

module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define('Participation', {
    user_id: DataTypes.UUID,
    event_id: DataTypes.UUID,
    distance: DataTypes.FLOAT
  }, {});
  Participation.associate = (models) => {
    Participation
      .belongsTo(models.event, {
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
      })
      .hasMany(models.comment)
      .hasMany(models.image);
  };
  return Participation;
};

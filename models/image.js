'use strict';

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      imageUrl: DataTypes.STRING,
    },
    {},
  );
  Image.associate = (models) => {
    Image.belongsTo(models.Participation, {
      onDelete: 'CASCADE',
      foreignKey: 'ParticipationId',
    });
  };
  return Image;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      participation_id: DataTypes.UUID,
      imageUrl: DataTypes.STRING,
    },
    {},
  );
  Image.associate = (models) => {
    Image.belongsTo(models.Participation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Image;
};

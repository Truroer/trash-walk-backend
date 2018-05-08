'use strict';

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    participation_id: DataTypes.UUID,
    imageUrl: DataTypes.STRING
  }, {});
  Image.associate = (models) => {
    // associations can be defined here
  };
  return Image;
};

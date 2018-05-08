'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    participation_id: DataTypes.UUID,
    comments: DataTypes.STRING
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.participation, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
      },
      comments: DataTypes.STRING,
    },
    {},
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Participation, {
      onDelete: 'CASCADE',
      foreignKey: 'ParticipationId',
    });
  };
  return Comment;
};

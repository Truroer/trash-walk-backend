'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    participation_id: DataTypes.UUID,
    comments: DataTypes.STRING
  }, {});
  Comment.associate = (models) => {
    // associations can be defined here
  };
  return Comment;
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Badges', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    achievements_id: {
      type: Sequelize.UUID
    },
    badge: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Badges')
};

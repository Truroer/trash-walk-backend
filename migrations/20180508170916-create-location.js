'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    user_id: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    event_id: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    geography: {
      type: Sequelize.GEOMETRY
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Locations')
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Participations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    user_id: {
      type: Sequelize.UUID
    },
    event_id: {
      type: Sequelize.UUID
    },
    distance: {
      type: Sequelize.FLOAT
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Participations')
};

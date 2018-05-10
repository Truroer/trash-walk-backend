'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Images', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID
    },
    ParticipationId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Participations',
        key: 'id'
      }
    },
    imageUrl: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Images')
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Participations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID
    },
    UserId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    EventId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Events',
        key: 'id',
      }
    },
    startTime: {
      type: Sequelize.DATE
    },
    endTime: {
      type: Sequelize.DATE
    },
    distance: {
      type: Sequelize.FLOAT
    },
    area: {
      type: Sequelize.FLOAT
    },
    shape: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Participations')
};

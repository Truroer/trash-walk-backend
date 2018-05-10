'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Achievements', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID
    },
    UserId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    BadgeId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Badges',
        key: 'id'
      }
    },
    date: {
      type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Achievements')
};

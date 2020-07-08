'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(320),
        allowNull: false,
      },
      createdAt: {
        //defaultValue: Sequelize.NOW, literal('Current-Timestamp')
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        //Null erlaubt theoretisch
        allowNull: false,
        type: Sequelize.DATE
      },
      passwordHash: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      permission: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: 'bit mask of permission from 2^0 until 2^30'
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};
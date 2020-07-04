'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('message',[
    {
      text: 'Hi Joe',
      fromId: 1,
      toId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),

    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('message',null,{});
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('task',[
    {
      name: 'My first Task',
      text: 'This is my first task',
      creatorId: 1,
      assignedToId: 1,
      projectId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('task',null,{});
  }
};
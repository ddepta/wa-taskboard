'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project',[
    {
      id: 1,
      name: 'My first Project',
      createdAt: new Date(),
      updatedAt: new Date(),

    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project',null,{});
  }
};

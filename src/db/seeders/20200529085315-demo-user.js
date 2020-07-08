'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user',[{
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'j.doe@fh-erfurt.de',
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordHash: '$2y$12$KX33YX2fml.CRvwaTH4IYOIPdRbOD7h5g2OIclzdWJuqTF2NgT4cO',
      permission: 0b1111111111111111
    },
    {
      id: 2,
      firstname: 'Johnny',
      lastname: 'Doerian',
      email: 'j.doerien@fh-erfurt.de',
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordHash: '$2y$12$KX33YX2fml.CRvwaTH4IYOIPdRbOD7h5g2OIclzdWJuqTF2NgT4cO',
      permission: 0b1111111111111111
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user',null,{});
  }
};

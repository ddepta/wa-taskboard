'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workflow = sequelize.define('Workflow', {
    name: {
      type :DataTypes.STRING(20),
      allowNull: false,
  },
  color: {
    type :DataTypes.STRING(9),
    allowNull: false,
  },
  sort: {
    type :DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,

  }
  
 }, {
    tableName: 'workflow'
 });
  Workflow.associate = function (models) {
    Workflow.belongsTo(models.Project,{
      as: 'project',
      foreignKey: 'projectId'
    });
  };
  return Workflow;
};
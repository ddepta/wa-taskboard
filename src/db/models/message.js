'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    text:{
        type: DataTypes.STRING,
        allowNull: false
      }

  }, {

    tableName: 'project'
  });
  /*message.associate = function(models) {
    MessageChannel.belongsTo(models.User,{
      as: 'from',
      foreignKey: 'fromId'

    });

    MessageChannel.belongsTo(models.User,{
      as: 'from',
      foreignKey: 'toId'

    });
  };*/
  return message;
};
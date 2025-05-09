'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chat.init({
    chat_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ipAddress: {type: DataTypes.STRING, allowNull: false},
    user_message: {type: DataTypes.TEXT, allowNull: false},
    bot_response: {type: DataTypes.TEXT, allowNull: false},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    underscored: true,
    timestamps: false,
    indexes: [
      {
        fields: ['ipAddress']
      },
      {
        fields: ['created_at']
      }
    ]
  });
  return chat;
};
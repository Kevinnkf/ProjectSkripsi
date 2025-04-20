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
    user_id: DataTypes.INTEGER,
    user_message: DataTypes.STRING,
    bot_response: DataTypes.STRING,
    chat_time: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Chat',
    underscored: true,
    timestamps: false
  });
  return chat;
};
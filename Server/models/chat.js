import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // define association here
    }
  }

  Chat.init({
    chat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ipAddress: { type: DataTypes.STRING, allowNull: false },
    user_message: { type: DataTypes.TEXT, allowNull: false },
    bot_response: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
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

  return Chat;
};

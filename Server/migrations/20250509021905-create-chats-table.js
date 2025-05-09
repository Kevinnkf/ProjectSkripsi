'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      chat_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ip_address: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      user_message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      bot_response: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('chats', ['ip_address']);
    await queryInterface.addIndex('chats', ['created_at']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};

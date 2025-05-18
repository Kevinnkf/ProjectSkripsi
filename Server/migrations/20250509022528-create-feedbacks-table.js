'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('feedbacks', {
    feedback_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    chat_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "chats",
        key: "chat_id"
      }
    },
    response: {
      type: Sequelize.ENUM('good', 'bad'),
      allowNull: false
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('feedbacks');
}
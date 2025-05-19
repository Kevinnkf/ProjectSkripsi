'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('baseknowledge', {
    bk_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    filename: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    },
    created_by: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('baseknowledge');
}
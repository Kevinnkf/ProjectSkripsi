'use strict';

const bcrypt = require('bcryptjs');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPass = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('admins', [{
      nippm: '2107412040',
      password: hashedPass,
      role: 'superadmin',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};

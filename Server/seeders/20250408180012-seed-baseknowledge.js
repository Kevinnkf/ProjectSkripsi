'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('baseknowledge', [  // <== table name harus plural sesuai Sequelize rule
      {
        bk_id: 1,
        filename: 'SOP_Tahun_Ajaran_2025-2026.pdf',
        notes: 'Dokumen penjelasan alur akademik',
        created_at: new Date(),
        created_by: 'Kevin',
      },
      {
        bk_id: 2,
        filename: 'SOP_PKKP_2026.docx',
        notes: 'Rangkuman penjelasan pelaksanan PKKP',
        created_at: new Date(),
        created_by: 'Fiqa',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('baseknowledge', null, {});
  }
};

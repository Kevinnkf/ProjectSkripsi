'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class baseknowledge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  baseknowledge.init({
    bk_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filename: DataTypes.STRING,
    notes: DataTypes.STRING,
    created_by: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'baseknowledge',
    underscored: true
  });
  return baseknowledge;
};
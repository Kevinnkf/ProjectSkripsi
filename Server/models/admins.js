'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admins.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nippm: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'admins',
    underscored: true
  });
  return admins;
};
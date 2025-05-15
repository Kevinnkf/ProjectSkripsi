import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Admins extends Model {
    static associate(models) {
      // define association here
    }
  }
  Admins.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nippm: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'admins',
    underscored: true,
  });
  return Admins;
};

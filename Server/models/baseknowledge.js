import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Baseknowledge extends Model {
    static associate(models) {
      // define association here
    }
  }
  Baseknowledge.init({
    bk_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    filename: DataTypes.STRING,
    notes: DataTypes.STRING,
    created_by: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'baseknowledge',
    underscored: true,
    timestamps: false 
  });
  return Baseknowledge;
};

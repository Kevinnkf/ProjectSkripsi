'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  faq.init({
    question: DataTypes.TEXT,
    answer: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'faq',
  });
  return faq;
};
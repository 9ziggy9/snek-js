'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Score.belongsTo(models.Player, {foreignKey: "playerId"});
    }
  }
  Score.init({
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
	min: 15,
      },
    }
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};

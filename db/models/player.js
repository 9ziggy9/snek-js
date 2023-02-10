'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.hasMany(models.Score, {
	foreignKey: "playerId",
	onDelete: "CASCADE",
      });
    }
  }
  Player.init({
    name: {
      type: DataTypes.STRING(10), 
      allowNull: false,
      unique: true,
      validate: {
	is: /^[A-Z0-9]{3,10}$/,
      },
    },
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};

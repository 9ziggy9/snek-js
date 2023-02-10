'use strict';

/** @type {import('sequelize-cli').Migration} */

const randoScores = (num) => [...Array(num)]
      .map(row => ({
	playerId: Math.floor(Math.random() * 20) + 1,
	score: Math.floor(Math.random() * 30) + 15,
      }));

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Scores', randoScores(200), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Scores', null, {});
  }
};

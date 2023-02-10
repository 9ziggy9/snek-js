'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Players', [
      {name: "ABC"}, {name: "BAC"}, {name: "CAB"}, {name: "LOL"},
      {name: "LEL"}, {name: "ZIG"}, {name: "ZIGGY"}, {name: "FTW"},
      {name: "SQL"}, {name: "LIZE"}, {name: "1337"}, {name: "HAKZOR"},
      {name: "KOOL"}, {name: "ALECK"}, {name: "RAD"}, {name: "123"},
      {name: "MOAR"}, {name: "LELZ"}, {name: "ZZZ"}, {name: "DONE"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {});
  }
};

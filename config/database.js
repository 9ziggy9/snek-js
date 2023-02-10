module.exports = {
  development: {
    storage: process.env.DB_PATH,
    dialect: "sqlite",
    seederStorage: "sequelize",
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    logging: console.log,
  },
};

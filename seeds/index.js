const seedPets = require('./pets-seed');
const seedUsers = require('./users-seed');
const seedLikes = require('./likes-seed');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedPets();
  console.log('\n----- PETS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedLikes();
  console.log('\n----- LIKES SEEDED -----\n');

  process.exit(0);
};

seedAll();
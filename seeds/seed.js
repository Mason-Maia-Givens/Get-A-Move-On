const sequelize = require('../config/connection');
const { User, Client, Mover } = require('../models');

const userSeedData = require('./userData.json');
const clientSeedData = require('./clientData.json');
const moverSeedData = require('./moverData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        // await User.bulkCreate(userSeedData);
        await Client.bulkCreate(clientSeedData);
        await Mover.bulkCreate(moverSeedData);
      
        process.exit(0);
    } catch (err) {
        console.log(err);
    }
};

seedDatabase();
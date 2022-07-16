const sequelize = require('../config/connection');
const { Client, Mover, Move } = require('../models');

const moveSeedData = require('./moveData.json');
const clientSeedData = require('./clientData.json');
const moverSeedData = require('./moverData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });    
        await Mover.bulkCreate(moverSeedData,{
            individualHooks: true,
            returning: true,
        }); 
        await Client.bulkCreate(clientSeedData,{
            individualHooks: true,
            returning: true,
        }); 
        await Move.bulkCreate(moveSeedData, {
            returning: true,
        });

        process.exit(0);
};

seedDatabase();
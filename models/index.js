const Move = require('./Move');
const Client = require('./Client');
const Mover = require('./Mover');

Client.hasMany(Move, {
    foreignKey: 'id',
});

Mover.hasMany(Move, {
    foreignKey: 'id',
});

// Client.belongsTo(Move, {
//     foreignKey: 'id',
// });

// Mover.belongsTo(Move, {
//     foreignKey: 'id',
// }); 

// belongsto?
Move.belongsTo(Client, {
    // as: 'client',
    // foreignKey: 'id',
});

Move.belongsTo(Mover, {
    // as: 'mover',
    // foreignKey: 'id',
});

Client.belongsToMany(Mover, {through: Move});

Mover.belongsToMany(Client, {through: Move});

module.exports = {Move, Client, Mover};
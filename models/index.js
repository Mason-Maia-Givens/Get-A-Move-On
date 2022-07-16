const Move = require('./Move');
const Client = require('./Client');
const Mover = require('./Mover');

Client.hasMany(Move, {
    foreignKey: 'client_id',
});

Mover.hasMany(Move, {
    foreignKey: 'mover_id',
});

Client.belongsTo(Move, {
    foreignKey: 'client_id',
});

Mover.belongsTo(Move, {
    foreignKey: 'mover_id',
}); 

Move.hasOne(Client, {
    as: 'client',
    foreignKey: 'client_id',
});

Move.hasOne(Mover, {
    as: 'mover',
    foreignKey: 'mover_id',
});

module.exports = {Move, Client, Mover};



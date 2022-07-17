const Move = require('./Move');
const Client = require('./Client');
const Mover = require('./Mover');

Client.hasMany(Move, {
    foreignKey: 'id',
});

Mover.hasMany(Move, {
    foreignKey: 'id',
});

Client.belongsTo(Move, {
    foreignKey: 'id',
});

Mover.belongsTo(Move, {
    foreignKey: 'id',
}); 

Move.hasOne(Client, {
    as: 'client',
    foreignKey: 'id',
});

Move.hasOne(Mover, {
    as: 'mover',
    foreignKey: 'id',
});

module.exports = {Move, Client, Mover};
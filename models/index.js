const User = require('./User');
const Move = require('./Move');
const Client = require('./Client');
const Mover = require('./Mover');

Client.hasMany(Move, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE',
});

Mover.hasMany(Move, {
    foreignKey: 'mover_id',
    onDelete: 'CASCADE',
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
    onDelete: 'CASCADE',
});

Move.hasOne(Mover, {
    as: 'mover',
    foreignKey: 'mover_id',
    onDelete: 'CASCADE'
});

User.hasMany{Client, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
}};

Client.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany{Mover, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
}};

Mover.belongsTo(User, {
    foreignKey: 'user_id'
});



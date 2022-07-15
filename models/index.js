const User = require('./User');
const Move = require('./Move');

User.hasMany(Move, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.belongsTo(Move, {
    foreignKey: 'user_id',
});

Move.hasOne(User, {
    as: 'client',
    foreignKey: ''

}) 
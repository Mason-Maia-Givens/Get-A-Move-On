const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Move extends Model {}

Move.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'name',
            }
        },
        mover_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'name',
            }
        },
        move_date: {
            type: DataTypes.DATE,
            allowNull: false, 
            validate: {
                isDate: true,
            },
        },
        move_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,     
        },
    },
    {
        sequelize, 
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'move'
    }
);

module.exports = Move;



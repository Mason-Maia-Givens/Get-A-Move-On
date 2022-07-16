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
        client_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'client',
                key: 'id',
            }
        },
        mover_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'mover',
                key: 'id',
            }
        },
        move_date: {
            type: DataTypes.DATE,
            allowNull: false, 
            validate: {
                isDate: true,
            },
        },
        price_per_hour: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false, 
            references: {
                model: 'mover',
                key: 'price_per_hour',
            },   
        },
        big_items: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        small_items: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stairs_elevator: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        end_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        storage: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    // estimate of big items
    // estimate of small items
    // stairs or elevator
    // end address
    // separate storage?  
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
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
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'client',
                key: 'id',
            }
        },
        mover_id: {
            type: DataTypes.INTEGER,
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
        start_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_address: {
            type: DataTypes.STRING,
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
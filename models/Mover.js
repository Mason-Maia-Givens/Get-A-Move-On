const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Mover extends Model {}

Mover.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'first_name',
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'last_name',
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            references: {
                model: 'user',
                key: 'email',
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
            references: {
                model: 'user',
                key: 'password'
            },
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'gender'
            },
        },
        current_address: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'current_address'
            },
        },
        price_per_hour: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        has_vehicle: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        vehicle_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size_of_crew: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        can_lift: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
     //pricing per hour
//has vehicle
//vehicle type/size
//size of crew
//license
//can lift 50 pounds?
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'mover',
    },
);

module.exports = Mover;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Client extends Model {}

Client.init(
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'name',
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
        },
        //cc_info: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        //}
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                //newUserData.cc_info = await bcrypt.hash(newUserData.cc_info, 10);
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
        modelName: 'client',
    },
);

module.exports = Client;

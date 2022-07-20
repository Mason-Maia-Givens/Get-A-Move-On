
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Mover extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

Mover.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        current_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_per_hour: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        vehicle_model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        drivers_license: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size_of_crew: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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


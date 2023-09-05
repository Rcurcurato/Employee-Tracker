const { Model, DataTypes } = require('sequelize');
const sequelize = require('../employee-tracker/config/connection');

// create our Department model
class Role extends Model { }

// create fields/columns for Department model
Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
            role_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
            salary: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'role'
    }
);

module.exports = Role;

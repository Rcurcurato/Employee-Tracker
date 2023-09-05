const { Model, DataTypes } = require('sequelize');
const sequelize = require('../employee-tracker/config/connection');

// create our Department model
class Department extends Model { }

// create fields/columns for Department model
Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'department'
    }
);

module.exports = Department;

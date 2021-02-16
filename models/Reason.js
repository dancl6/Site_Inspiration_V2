const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reason extends Model {
    // checkPassword(loginPw) {
    //     return bcrypt.compare(loginPw, this.password)
    // }
}

Reason.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        reason_tag: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // quotes_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'reason'
    }
)

module.exports = Reason;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quotes extends Model {}

// create data types for Product model
Quotes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quote: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isDecimal: true
            // }
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // },
        reason_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reason',
                key: 'id'
            }
        },
        // image: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     validate: {
        //         isUrl: true
        //     }
        // },
        // featured: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false
        // },
        // category_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'category',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'quotes'
    }
);

module.exports = Quotes;

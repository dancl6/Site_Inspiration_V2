const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User_Quotes extends Model {}

// create data types for User_Product model
User_Quotes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },        
      quotes_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quotes',
        key: 'id'
      }
    }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user_quotes'
    }
  );

  module.exports = User_Quotes;
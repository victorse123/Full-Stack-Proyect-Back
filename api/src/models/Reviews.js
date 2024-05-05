const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review =sequelize.define("review", {
       
        
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },

},{timestamps: false});

return Review
};
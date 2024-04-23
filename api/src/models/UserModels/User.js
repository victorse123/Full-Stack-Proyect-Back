const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
    
      id:{type:DataTypes.INTEGER,
        autoIncrement:true,
      primaryKey:true
    }
    ,
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Asegura que el valor de email sea una dirección de correo electrónico válida
        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    }
      
    },
    {  timestamps: false} );
};
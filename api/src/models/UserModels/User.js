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
    imageDefault: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    DNI: {
      type: DataTypes.STRING,
      //allowNull: false,
      //unique: true,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    //allowNull: false,
    //unique: true
},
     
    },
    {  timestamps: false} );
};
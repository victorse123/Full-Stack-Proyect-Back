const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Sales = sequelize.define("sales", {
        
        id:{type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        paymentId: {
            type: DataTypes.STRING,
            allowNull: false
          },
          authorizationCode: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
          }

    }, { timestamps: false });

    return Sales;
};





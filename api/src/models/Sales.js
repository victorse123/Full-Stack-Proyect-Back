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
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }

    }, { timestamps: false });


     // Ganchos para establecer la fecha y hora de registro antes de la creación
     Sales.beforeCreate((sales, options) => {
      sales.createdAt = new Date();
  });

    return Sales;
};





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
        
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        
    },
    createdAt: {
        type: DataTypes.DATEONLY, // Cambiar el tipo de datos a DATEONLY para almacenar solo la fecha
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

},{timestamps: false});

  // Gancho para establecer la fecha y hora de registro antes de la creación
  Review.beforeCreate((review, options) => {
    // Establecer el campo createdAt como la fecha actual
    review.createdAt = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato "YYYY-MM-DD"
});

return Review
};
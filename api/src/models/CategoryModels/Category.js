const { dataTypes, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("category", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
          },



    },{timestamps: false});
};
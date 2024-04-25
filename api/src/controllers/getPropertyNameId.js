const axios = require("axios");
const { Property, Type,Category } = require("../db");

const getPropertyNameId = async (id) => {
    try {
        const property = await Property.findByPk(id, {
            include: {
                model: Type,
                attributes: ["name"],
                through: { attributes: [] },
            },
        });

        if (!property) {
            return null; // No se encontró ninguna propiedad con el ID dado
        }

        const propertyData = property.toJSON(); // Convertir el objeto a formato JSON
        propertyData.name = propertyData.name.charAt(0).toUpperCase() + propertyData.name.slice(1);
        propertyData.types = propertyData.types.map((type) => type.name);

        return propertyData;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = getPropertyNameId;
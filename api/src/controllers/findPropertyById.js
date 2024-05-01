const axios = require("axios");
const { Property, Type,Category } = require("../db");


const findPropertyId = async (id) => {
    try {
        const propertyId = await Property.findByPk(id,{
            include: [{ model: Type},{model:Category} ],
            attributes: { exclude: ['typeId', 'categoryId'] }
            // Incluir la asociación Type correctamente
    });


        const simplifiedProperties = {
            ...propertyId.toJSON(),
            type: propertyId.type.name,
            category: propertyId.category.name
        };

        //return simplifiedProperties;
        return simplifiedProperties
    } catch (error) {
        throw error;
    }
};

module.exports = findPropertyId;
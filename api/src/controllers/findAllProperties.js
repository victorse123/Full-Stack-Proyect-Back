const { Property, Type ,Category} = require("../db");

const findAllProperties = async (type) => {
    try {
        const properties = await Property.findAll({
            include: [{ model: Type},{model:Category} ],
            attributes: { exclude: ['typeId', 'categoryId'] },
            
            
        });

        // No necesitas mapear los resultados ni eliminar el Type del resultado

        const simplifiedProperties = properties.map(property => ({
            ...property.toJSON(),
            type: property.type.name,
            category: property.category.name
        }));

        return simplifiedProperties;
    } catch (error) {
        throw error;
    }
};

module.exports =  findAllProperties;

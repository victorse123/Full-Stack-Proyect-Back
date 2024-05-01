const { Property, Type ,Category} = require("../db");

const findAllProperties = async (type) => {
    try {
        const properties = await Property.findAll({
            where: {
                isActive: true // Agrega la condición isActive:true
            },


            include: [{ model: Type},{model:Category} ],
            attributes: { exclude: ['typeId', 'categoryId'] },
            
            
        });

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

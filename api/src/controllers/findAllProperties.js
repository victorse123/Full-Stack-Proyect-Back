const { Property, Type ,Category} = require("../db");

const findAllProperties = async (type) => {
    try {
        const properties = await Property.findAll({
            where: {
                // isActive: true // Agrega la condición isActive:true
            },


            include: [{ model: Type},{model:Category} ],
            attributes: { exclude: ['typeId', 'categoryId'] },
            order: [['id', 'ASC']]
            
            
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
//https://github.com/maxisosa89/challenge-alkemy-nodejs
//https://github.com/maxisosa89



//https://github.com/maxisosa89/PF_backend_ecommerce/blob/dev/src/models/Reviews.js
const { Property, Type ,Category} = require("../db");

// const findAllProperties = async () => {
//     try {

        
            

//         const properties = await Property.findAll({
//             include: Type // Incluye la información del tipo correspondiente
//         });

//         // Mapeamos los resultados y reemplazamos typeId con el nombre del tipo
//         const mappedProperties = properties.map(property => ({
//             ...property.toJSON(),
//             typeId: property.Type.name,// Reemplaza typeId con el nombre del tipo
//               Type:undefined
//         }));

//         return mappedProperties;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = findAllProperties;


const findAllProperties = async () => {
    try {
        const properties = await Property.findAll({
            include: [{ model: Type},{model:Category} ],
            attributes: { exclude: ['typeId', 'categoryId'] }
            // Incluir la asociación Type correctamente
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

module.exports = findAllProperties;
// const { Property, Type } = require('../db');

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
            include: { model: Type } // Incluir la asociación Type correctamente
        });

        // No necesitas mapear los resultados ni eliminar el Type del resultado

        return properties;
    } catch (error) {
        throw error;
    }
};

module.exports = findAllProperties;
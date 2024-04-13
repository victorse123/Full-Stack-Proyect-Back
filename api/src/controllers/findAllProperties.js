const { Property, Type } = require('../db');

const findAllProperties = async () => {
    try {

        
            

        const properties = await Property.findAll({
            include: Type // Incluye la información del tipo correspondiente
        });

        // Mapeamos los resultados y reemplazamos typeId con el nombre del tipo
        const mappedProperties = properties.map(property => ({
            ...property.toJSON(),
            typeId: property.Type.name,// Reemplaza typeId con el nombre del tipo
              Type:undefined
        }));

        return mappedProperties;
    } catch (error) {
        throw error;
    }
};

module.exports = findAllProperties;
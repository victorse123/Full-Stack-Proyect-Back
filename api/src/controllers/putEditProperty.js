const { Property, Type, Category } = require("../db");

const putProperty = async (propertyId, updatedProperty) => {
    try {
        // Desestructura los datos de la propiedad actualizada
        let { price, title, zone, address, region, city, description, bedrooms, bathrooms, parking, storage, swimmingPool, imageDefault, type, category, isActive } = updatedProperty;

        // Encuentra la propiedad existente por su ID
        let property = await Property.findByPk(propertyId);

        // Si no se encuentra la propiedad, lanza un error
        if (!property) {
            throw new Error('La propiedad no fue encontrada.');
        }

        // Busca el tipo y la categoría en la base de datos
        const typeDb = await Type.findOne({ where: { name: type } });
        const categoryDB = await Category.findOne({ where: { name: category } });

        // Si no se encuentra el tipo o la categoría, lanza un error
        if (!typeDb) {
            throw new Error('Tipo no encontrado.');
        }
        if (!categoryDB) {
            throw new Error('Categoría no encontrada.');
            
        }

        // Actualiza los datos de la propiedad con los nuevos valores proporcionados
        await property.update({
            price,
            title,
            zone,
            address,
            region,
            city,
            description,
            bedrooms,
            bathrooms,
            parking,
            storage,
            swimmingPool,
            imageDefault,
            typeId: typeDb.id,
            categoryId: categoryDB.id,
            isActive
        });

        // Asigna los nombres del tipo y la categoría a la propiedad actualizada
        property.typeId = typeDb.name;
        property.categoryId = categoryDB.name;


     

        // Devuelve la propiedad actualizada
        return property;
    } catch (error) {
       console.log(  error)
    }
};

module.exports = putProperty;
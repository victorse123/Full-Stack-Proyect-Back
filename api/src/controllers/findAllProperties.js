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





// const { Property, Type, Category } = require("../db");

// const findAllProperties = async (propertyType) => {
//     try {
//         // Buscar el objeto Type correspondiente al tipo de propiedad proporcionado
//         const typeDb = await Type.findOne({ where: { name: propertyType } });
//         if (!typeDb) {
//             throw new Error('Tipo de propiedad no encontrado');
//         }

//         // Filtrar las propiedades por el tipo de propiedad
//         const properties = await Property.findAll({
//             include: [{ model: Type }, { model: Category }],
//             attributes: { exclude: ['typeId', 'categoryId'] },
//             where: { typeId: typeDb.id }
//         });

//         const simplifiedProperties = properties.map(property => ({
//             ...property.toJSON(),
//             type: property.type.name,
//             category: property.category.name
//         }));
// //console.log(simplifiedProperties);
//         return simplifiedProperties;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = findAllProperties;


// const findAllProperties = async (type, category, priceOrder) => {
//     try {
//         // Objeto para almacenar los filtros de la consulta
//         let filter = {};

//         // Agregar filtro de tipo si se proporciona
//         if (type) {
//             const typeDb = await Type.findOne({ where: { name: type } });
//             if (!typeDb) {
//                 throw new Error('Tipo de propiedad no encontrado');
//             }
//             filter.typeId = typeDb.id;
//         }

//         // Agregar filtro de categoría si se proporciona
//         if (category) {
//             const categoryDb = await Category.findOne({ where: { name: category } });
//             if (!categoryDb) {
//                 throw new Error('Categoría de propiedad no encontrada');
//             }
//             filter.categoryId = categoryDb.id;
//         }

//         // Definir orden predeterminado
//         let order = [];

//         // Agregar orden por precio si se proporciona
//         if (priceOrder) {
//             order.push(['price', priceOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']);
//         }

//         // Filtrar y ordenar las propiedades según los filtros proporcionados
//         const properties = await Property.findAll({
//             include: [{ model: Type }, { model: Category }],
//             attributes: { exclude: ['typeId', 'categoryId'] },
//             where: filter,
//             order: order
//         });

//         // Transformar los resultados a un formato simplificado
//         const simplifiedProperties = properties.map(property => ({
//             ...property.toJSON(),
//             type: property.type.name,
//             category: property.category.name
//         }));

//         return simplifiedProperties;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = findAllProperties;
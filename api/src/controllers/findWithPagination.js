// const findAllPropertiesWithPagination = async (page, pageSize) => {
//     try {
//         const offset = (page - 1) * pageSize;

//         const properties = await Property.findAndCountAll({
//             limit: pageSize,
//             offset: offset,
//             include: Type
//         });

//         const totalItems = properties.count;
//         const totalPages = Math.ceil(totalItems / pageSize);

//         return {
//             properties: properties.rows,
//             meta: {
//                 totalItems,
//                 totalPages
//             }
//         };
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports=findAllPropertiesWithPagination
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Property, Type, Category } = require("../db");

const findAllPropertiesWithPagination = async (page, pageSize) => {
    try {
         // Mostrar 10 propiedades por página
        const offset = (page - 1) * pageSize;

        const properties = await Property.findAndCountAll({
            limit: pageSize,
            offset: offset,
            include: [{ model: Type }, { model: Category }],
            attributes: { exclude: ['typeId', 'categoryId'] },
            order: [['id', 'ASC']]
        });

        const totalItems = properties.count;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            properties: properties.rows.map(property => ({
                id: property.id,
                price: property.price,
                title: property.title,
                zone: property.zone,
                address: property.address,
                region: property.region,
                city: property.city,
                description: property.description,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                parking: property.parking,
                storage: property.storage,
                swimmingPool: property.swimmingPool,
                imageDefault: property.imageDefault,
                type: property.type.name,
                category: property.category.name
            })),

            meta: {


                totalItems,
                totalPages

            }


        };
    } catch (error) {
        throw error;
    }
};

module.exports = findAllPropertiesWithPagination;




// const findAllPropertiesWithPagination = async (page, pageSize) => {
//     try {
//         // Definimos el tamaño de cada página
//         const pageSize = 8; // Mostrar 8 propiedades por página

//         // Calculamos el desplazamiento en la consulta para la paginación
//         const offset = (page - 1) * pageSize;

//         // Realizamos la consulta a la base de datos con el límite y el desplazamiento
//         const properties = await Property.findAndCountAll({
//             limit: pageSize,
//             offset: offset,
//             include: [{ model: Type }, { model: Category }],
//             attributes: { exclude: ['typeId', 'categoryId'] }
//         });

//         // Calculamos el número total de elementos y el total de páginas
//         const totalItems = properties.count;
//         const totalPages = Math.ceil(totalItems / pageSize);

//         // Retornamos un objeto con las propiedades y la información de paginación
//         return {
//             properties: properties.rows.map(property => ({
//                 // Propiedades de cada propiedad

                
//             })),
//             meta: {
//                 totalItems,
//                 totalPages
//             }
//         };
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = findAllPropertiesWithPagination;
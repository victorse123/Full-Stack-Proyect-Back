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

const { Property, Type, Category } = require("../db");

const findAllPropertiesWithPagination = async (page, pageSize) => {
    try {
        const offset = (page - 1) * pageSize;

        const properties = await Property.findAndCountAll({
            limit: pageSize,
            offset: offset,
            include: [{ model: Type }, { model: Category }],
            attributes: { exclude: ['typeId', 'categoryId'] }
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
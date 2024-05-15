const { Property, Type, Category } = require("../db");
const { Op } = require("sequelize");
const {findAllPropertiesWithPagination}=require('./findWithPagination')

const normalizeString = (str) => {
    return str.toLowerCase()
        .normalize("NFD") // Normalizar tildes
        .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
        .replace(/-/g, ""); // Eliminar guiones
};

const filterController = async (type, category, priceOrder, zone,page,pageSize) => {
    try {
        // Objeto para almacenar los filtros de la consulta
        let filter = {
            isActive: true,
          
        };

        // Agregar filtro de tipo si se proporciona
        if (type) {
            
            const typeDb = await Type.findOne({ where: { name: type } });
            if (!typeDb) {
                throw new Error('Tipo de propiedad no encontrado');
            }
            filter.typeId = typeDb.id;
        }

        // Agregar filtro de categoría si se proporciona
        if (category) {
            
            const categoryDb = await Category.findOne({ where: { name: category } });
            if (!categoryDb) {
                throw new Error('Categoría de propiedad no encontrada');
            }
            filter.categoryId = categoryDb.id;
        }


        // Normalizar la zona si se proporciona
        if (zone) {
            const normalizedZone = normalizeString(zone);
            filter.zone = { [Op.iLike]: `%${normalizedZone}%` }; // Usar Op.iLike para la búsqueda insensible a mayúsculas/minúsculas
        }

        // Definir orden predeterminado
        let order = [];

        // Agregar orden por precio si se proporciona
        if (priceOrder) {
            order.push(['price', priceOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']);
        }

        // Filtrar y ordenar las propiedades según los filtros proporcionados
        const properties = await Property.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            include: [{ model: Type }, { model: Category }],
            attributes: { exclude: ['typeId', 'categoryId'] },
            where: filter,
            order: order,
            //order: [['id', 'ASC']]
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
            category: property.category.name,
            isActive:property.isActive
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

module.exports = filterController;
const { Property, Type ,Category} = require("../db");



const filterController = async (type, category, priceOrder,zone) => {
    try {
        // Objeto para almacenar los filtros de la consulta
        let filter = {};

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

        // Definir orden predeterminado
        let order = [];

        // Agregar orden por precio si se proporciona
        if (priceOrder) {
            order.push(['price', priceOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']);
        }

        // Filtrar y ordenar las propiedades según los filtros proporcionados
        const properties = await Property.findAll({
            include: [{ model: Type }, { model: Category }],
            attributes: { exclude: ['typeId', 'categoryId'] },
            where: filter,
            order: order
        });

        // Transformar los resultados a un formato simplificado
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

module.exports = filterController;
const findAllPropertiesWithPagination = async (page, pageSize) => {
    try {
        // Realizamos la consulta a la base de datos con el límite y el desplazamiento
        const properties = await Property.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            include: [{ model: Type }, { model: Category }],
            attributes: { exclude: ['typeId', 'categoryId'] }
        });

        // Calculamos el número total de elementos y el total de páginas
        const totalItems = properties.count;
        const totalPages = Math.ceil(totalItems / pageSize);

        // Retornamos un objeto con las propiedades y la información de paginación
        return {
            properties: properties.rows,
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
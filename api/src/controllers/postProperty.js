const {Property,Type,Category} = require("../db");

const postProperty = async (newProperty, res) => { // Agrega res como un parámetro
    try {
        let { price, title, zone, address, region, city, description, bedrooms, bathrooms, parking, storage, swimmingPool, imageDefault, type,category } = newProperty;

        const typeDb = await Type.findOne({ where: { name: type } });
        const categoryDB= await Category.findOne({where:{name:category}})
       
        if (!typeDb)throw new Error('Tipo no encontrado');
        if (!categoryDB)throw new Error('Categoria no encontrada');

        // Carga la property creada a la database (DB)
        let propertyCreated = await Property.create({
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
            typeId:typeDb.id,
            categoryId:categoryDB.id
        });
         propertyCreated.typeId=typeDb.name
         propertyCreated.categoryId=categoryDB.name
        return propertyCreated; // Devuelve la property creada
    } catch (error) {
        throw Error(error) // Envía una respuesta de error al cliente
        console.log(error);
    }
}

module.exports = postProperty;
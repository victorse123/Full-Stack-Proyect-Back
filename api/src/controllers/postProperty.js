
const {Property,Type} = require("../db");

const postProperty = async (newProperty, res) => { // Agrega res como un parámetro
    try {
        let { price,zone, address, regions, description, bedrooms, bathrooms, parking, storage, swimmingPool, imageDefault, type } = newProperty;

        const typeDb = await Type.findOne({ where: { name: type } });

        if (!typeDb) {
            return res.status(404).json({ error: 'Tipo no encontrado' });
        }



        // Carga la property creada a la database (DB)
        let propertyCreated = await Property.create({
            price,
            zone,
            address,
            regions,
            description,
            bedrooms,
            bathrooms,
            parking,
            storage,
            swimmingPool,
            imageDefault,
            typeId:typeDb.id
        });

        return propertyCreated; // Devuelve la property creada
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envía una respuesta de error al cliente
        console.log(error);
    }
}

module.exports = postProperty;
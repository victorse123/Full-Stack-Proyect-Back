const {Property} = require("../db");

const postProperty = async (newProperty, res) => { // Agrega res como un parámetro
    try {
        let { zone, address, regions, description, bedrooms, bathrooms, parking, storage, swimmingpool, imageDefault, type } = newProperty;

        // Carga la property creada a la database (DB)
        let propertyCreated = await Property.create({
            zone,
            address,
            regions,
            description,
            bedrooms,
            bathrooms,
            parking,
            storage,
            swimmingpool,
            imageDefault,
            type
        });

        return propertyCreated; // Devuelve la property creada
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envía una respuesta de error al cliente
        console.log(error);
    }
}

module.exports = postProperty;
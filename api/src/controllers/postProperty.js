const {House} = require("../db");

const postHouse = async (newHouse, res) => { // Agrega res como un parámetro
    try {
        let { zone, description, bedrooms, bathrooms, imageDefault, type } = newHouse;

        // Carga la house creada a la database (DB)
        let houseCreated = await House.create({
            zone,
            description,
            bedrooms,
            bathrooms,
            imageDefault,
            type
        });

        return houseCreated; // Devuelve la house creada
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envía una respuesta de error al cliente
        console.log(error);
    }
}

module.exports = postHouse;
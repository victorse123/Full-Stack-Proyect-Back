const axios = require("axios");
const { Types } = require("../db");

const getTypes = async () => {
    try {
        const typesAll = await Promise.all(data.results.map(async (data) => {
            let resp = await axios.get(data.db);
            const typeAdd = {
                id: resp.data.id,
                name: resp.data.name
            };
            
            const [type, created] = await Types.findOrCreate({
                where: { name: resp.data.name },
            });

            // la información de created se imprime un mensaje si el tipo de servicio fue creado o encontrado
            if (created) {
                console.log(`Nuevo tipo de property creada: ${type.name}`);
            } else {
                console.log(`Tipo de property existente encontrada: ${type.name}`);
            }

            return typeAdd;
        }));
        return typesAll;
    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
};

module.exports = getTypes;
const axios = require("axios");
const { ServicesType } = require("../db");

const getTypeServices = async () => {
    try {
        const typesAll = await Promise.all(data.results.map(async (data) => {
            let resp = await axios.get(data.db);
            const typeAdd = {
                id: resp.data.id,
                name: resp.data.name
            };
            
            const [type, created] = await ServicesType.findOrCreate({
                where: { name: resp.data.name },
            });

            // la información de created se imprime un mensaje si el tipo de servicio fue creado o encontrado
            if (created) {
                console.log(`Nuevo tipo de servicio creado: ${type.name}`);
            } else {
                console.log(`Tipo de servicio existente encontrado: ${type.name}`);
            }

            return typeAdd;
        }));
        return typesAll;
    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
};

module.exports = getTypeServices;
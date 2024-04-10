const axios = require("axios");
const { Type } = require("../db");

const getTypeService = async () => {
    try {
        const typesAll = await Promise.all(data.results.map(async (data) => {
            let resp = await axios.get(data.db);
            const typeAdd = {
                id: resp.data.id,
                zone: resp.data.zone
            };
            
            const [type, created] = await Type.findOrCreate({
                where: { zone: resp.data.zone },
            });

            // la información de created se imprime un mensaje si el tipo de servicio fue creado o encontrado
            if (created) {
                console.log(`Nuevo tipo de servicio creado: ${type.zone}`);
            } else {
                console.log(`Tipo de servicio existente encontrado: ${type.zone}`);
            }

            return typeAdd;
        }));
        return typesAll;
    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
};

module.exports = getTypeService;
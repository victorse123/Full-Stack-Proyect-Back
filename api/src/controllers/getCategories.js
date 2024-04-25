const axios = require("axios");
const { Categories } = require("../db");

const getCategories= async () => {
    try {
        const categoriesAll = await Promise.all(data.results.map(async (data) => {
            let resp = await axios.get(data.db);
            const categoryAdd = {
                id: resp.data.id,
                name: resp.data.name
            };
            
            const [category, created] = await Categories.findOrCreate({
                where: { name: resp.data.name },
            });

            // la información de created se imprime un mensaje si el tipo de servicio fue creado o encontrado
            if (created) {
                console.log(`Nueva categoria de property creada: ${type.name}`);
            } else {
                console.log(`Categoria de property existente encontrada: ${type.name}`);
            }

            return categoryAdd;
        }));
        return categoriesAll;
    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
};

module.exports = getCategories;
const {Category}=require('../db')










 const postCategory = async (name) => {
    try {
        // Convertir el nombre a minúsculas
        const lowercaseName = name.toLowerCase();
        
        // Buscar si ya existe un tipo con el nombre en minúsculas
        let [category, created] = await Category.findOrCreate({
            where: { name: lowercaseName },
            defaults: { name: lowercaseName }
        });
 
        // Si la category ya existe, no es necesario crear uno nuevo
        if (!created) {
            return category;
        }
 
        return category;
    } catch (error) {
        throw error;
    }
 }
 
 module.exports = postCategory;
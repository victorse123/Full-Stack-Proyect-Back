const {Type}=require('../db')










 const createType = async (name) => {
   try {
       // Convertir el nombre a minúsculas
       const lowercaseName = name.toLowerCase();
       
       // Buscar si ya existe un tipo con el nombre en minúsculas
       let [type, created] = await Type.findOrCreate({
           where: { name: lowercaseName },
           defaults: { name: lowercaseName }
       });

       // Si el tipo ya existe, no es necesario crear uno nuevo
       if (!created) {
           return type;
       }

       return type;
   } catch (error) {
       throw error;
   }
}

module.exports = createType;
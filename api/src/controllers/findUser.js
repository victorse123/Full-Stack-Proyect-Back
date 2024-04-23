
const {User}=require('../db')



// Función para buscar un usuario por su correo electrónico
const findUser = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            return  {exists:true,user} ;
        } else {
            return{exists:false};
        }
    } catch (error) {
        throw new Error('Error al buscar el usuario en la base de datos');
    }
};

module.exports = findUser ;
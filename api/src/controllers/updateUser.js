const { User } = require("../db");

const updateUser = async (userId, updatedUserData) => {
    try {


const { name, email,imageDefault,isActive,DNI,dateOfBirth }=updatedUserData

        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        // Actualizar los datos del usuario con los nuevos valores proporcionados
        await user.update({ 
            name,
            email,
            imageDefault,
            isActive,
            DNI,
            dateOfBirth });

        // Devolver el usuario actualizado
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = updateUser;
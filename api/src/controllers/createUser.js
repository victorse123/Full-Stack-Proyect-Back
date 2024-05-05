const {User}=require('../db')

const createUser = async (newUser) => {
    const { name, email,imageDefault,isActive,DNI,dateOfBirth } = newUser;
  
    if (!name || !email) {
      throw new Error('Se requieren nombre de usuario y correo electrónico para crear un usuario.');
  }
    // Buscar usuario existente por correo electrónico
    let [user, created] = await User.findOrCreate({
      where: {  email },
      defaults:{
        name,
        imageDefault, 
        isActive, 
        DNI, 
         dateOfBirth 
    }
    });

    // Si se creó un nuevo usuario, devuelve el usuario
    if (created) {
      return user;
    } else {
      // Si el usuario ya existía, devuelve un mensaje o lanza un error
      throw new Error('El usuario ya existe en la base de datos.');
    }
  };

  module.exports=createUser
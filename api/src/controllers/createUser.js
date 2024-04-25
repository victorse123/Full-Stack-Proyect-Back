const {User}=require('../db')






const createUser = async (newUser) => {
    const { userName, userEmail } = newUser;
  
    // Buscar usuario existente por correo electrónico
    let [user, created] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: { name: userName }
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
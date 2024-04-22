const {Type}=require('../db')

const createType = async (name)=>{
const newType= await Type.create({name})//el objeto que mandamos tiene que llevar propiedades que tengan nombres de los atributos
   // el create es el insert a esa tabla
return newType 
}

 module.exports=createType
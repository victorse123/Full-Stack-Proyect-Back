const {Type}=require('../db')

const createType = async (name)=>{
const newType= await Type.create({name})
   
return newType 
}

 module.exports=createType
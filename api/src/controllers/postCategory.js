const {Category}=require('../db')

const postCategory = async (name)=>{
const newCategory= await Category.create({name})
  
return newCategory
}

 module.exports=postCategory
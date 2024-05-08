const {Sales,Property,User}=require('../db')

const salesController = async ({id,authorization_code,description,transaction_amount})=>{

try {
    
    const data=description.split('-')
    const idProperty=data[1]
    const userEmail=data[2]
    const propertyDescription=data[0]
     
    
    console.log(userEmail);
    
    const propertyDb=await Property.findOne({where:{id:idProperty}})
    const userDb=await User.findOne({where:{email:userEmail}})
    //console.log(propertyDb.dataValues);
    console.log(userDb.dataValues);
    if (!propertyDb)throw new Error('Property not found');
    if (!userDb)throw new Error('user not found');
    
    
    let saleCreated=await Sales.create({
        paymentId:id,
        authorizationCode:authorization_code,
        description:propertyDescription,
        amount:transaction_amount,
        UserId:userDb.dataValues.id,
        propertyId:propertyDb.dataValues.id
    })
      return saleCreated

} catch (error) {
    throw Error(error) // Envía una respuesta de error al cliente
        console.log(error);
}





//id,authorization_code,description,transaction_amount);
// const newCategory= await C.create({name})
  
// return newCategory
}

 module.exports=salesController
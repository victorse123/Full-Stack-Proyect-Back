const {Property,User} = require("../db");

const postReview = async (newReview, res) => { 
    try {
        let { score, description, property, user } = newReview;

        const propertyDb = await Property.findOne({ where: { name: property } });
        const userDB= await User.findOne({where: { name:user }})
       
        if (!propertyDb)throw new Error('Property no encontrada');
        if (!userDB)throw new Error('User no encontrado');

        
        let reviewCreated = await Review.create({
            score,
            description,
            propertyId:propertyDb.id,
            userId:userDB.id
        });
         reviewCreated.propertyId=propertyDb.name
         reviewCreated.userId=userDB.name
        return reviewCreated; 
    } catch (error) {
        throw Error(error) 
        console.log(error);
    }
}

module.exports = postReview;
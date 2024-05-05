const {Property,User} = require("../db");

const postReview = async (newReview, res) => { 
    try {
        let { score, description, property, user } = newReview;

        const propertyDb = await Property.findOne({ where: { name: property } });
        const UserDB= await User.findOne({where: { name: user }})
       
        if (!propertyDb)throw new Error('Property no encontrada');
        if (!userDB)throw new Error('User no encontrado');

        
        let reviewCreated = await Review.create({
            score,
            description,
            propertyId:propertyDb.id,
            UserId:UserDB.id
        });
         reviewCreated.propertyId=propertyDb.id ,
         reviewCreated.UserId=UserDB.id
        return reviewCreated; 
    } catch (error) {
        throw Error(error) 
        console.log(error);
    }
}

module.exports = postReview;
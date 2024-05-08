const { Router } = require("express");

const salesController=require('../controllers/salesController')

const router = Router();
// router.get("/", async (req,res) => {
//     const types = await getTypes();
//     res.send(types);
// });


router.post('/',async(req,res)=>{
    try {
        const data =req.body//{id,authorization_code,description,transaction_amount}=req.body
     //console.log(papo)
        const newSale= await salesController(data)
        res.sendStatus(200)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }})




module.exports = router; 

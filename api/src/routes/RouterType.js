const { Router } = require("express");
const getTypes = require("../controllers/getTypes");
const createType=require("../controllers/createType");

const router = Router();
router.get("/", async (req,res) => {
    const types = await getTypes();
    res.send(types);
});


router.post('/',async(req,res)=>{
    try {
        const {name}=req.body
        const newEpisode= await createType(name)
        res.status(201).json(newEpisode)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }})




module.exports = router; 

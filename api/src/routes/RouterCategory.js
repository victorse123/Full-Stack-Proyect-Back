const { Router } = require("express");
const getCategories = require("../controllers/getCategories");
const postCategory=require("../controllers/postCategory");

const router = Router();

router.get("/", async (req,res) => {
    const categories = await getCategories();
    res.send(categories);
});

router.post('/',async(req,res)=>{
    try {
        const {name}=req.body
        const newEpisode= await postCategory(name)
        res.status(201).json(newEpisode)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }})

module.exports = router; 

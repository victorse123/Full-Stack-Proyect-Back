const { Router } = require("express");
const getTypes = require("../controllers/getTypes");

const router = Router();
router.get("/", async (req,res) => {
    const types = await getTypes();
    res.send(types);
});

module.exports = router; 

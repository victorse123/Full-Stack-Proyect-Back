const { Router } = require("express");
const findAllProperties = require("../controllers/findAllProperties");

const router = Router();


router.get("/properties", async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query; 
        const result = await findAllProperties(parseInt(page), parseInt(pageSize));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
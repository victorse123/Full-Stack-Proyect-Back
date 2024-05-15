const { Router } = require("express");

const findAllPropertiesWithPagination=require('../controllers/findWithPagination')
const router = Router();

router.get("/properties", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 2; // Definir el tamaño de la página aquí

        const properties = await findAllPropertiesWithPagination(page, pageSize);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const { Router } = require("express");
const router = Router();
const findPropertyById=require('../controllers/findPropertyById');

// Ruta para buscar Property por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const property = await findPropertyById(id);
        if (property) {
            res.status(200).json(property);
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router
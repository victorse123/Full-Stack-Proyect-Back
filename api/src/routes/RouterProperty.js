const { Router } = require("express");

const getPropertys = require("../controllers/getPropertys");
const getPropertyNameId = require("../controllers/getPropertyNameId");
const postProperty = require("../controllers/postProperty");
const { Type } = require("../db");

const router = Router();

// Ruta para buscar Propiedades por zona
router.get("/", async (req, res) => {
    const { zone } = req.query;
    try {
        const propertys = await getPropertys();
        if (zone) {
            // Buscar Property por zona 
            const propByZone = propertys.filter(prop => prop.zone.toLowerCase().startsWith(zone.toLowerCase()));
            if (propByZone.length > 0) {
                res.status(200).json(propByZone);
            } else {
                res.status(404).json({ message: "Properties not found for the given zone" });
            }
        } else {
            res.json(propertys);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para buscar Property por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const property = await getPropertyNameId(id);
        if (property) {
            res.status(200).json(property);
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para crear una nueva Property
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newPrope = req.body;
        const propeCreated = await postProperty(newPrope, res);
        
        // Buscar en la base de datos (DB) los tipos asociados a la propiedad
        const typesDb = await Type.findAll({ where: { name: newPrope.type } });
        
        // Asociar los tipos encontrados
        await propeCreated.addType(typesDb);
        
        res.status(201).send('Property created');
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});
module.exports = router;


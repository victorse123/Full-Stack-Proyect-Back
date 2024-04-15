const { Router } = require("express");

const getProperties = require("../controllers/getProperties");
const getPropertyNameId = require("../controllers/getPropertyNameId");
const postProperty = require("../controllers/postProperty");
const findAllProperties= require("../controllers/findAllProperties")

const { Type } = require("../db");

const router = Router();

//Ruta para buscar Propiedades por zona
router.get("/", async (req, res) => {
    const { zone } = req.query;
    try {
        const properties = await getProperties();
        if (zone) {
            // Buscar Property por zona 
            const propByZone = properties.filter(prop => prop.zone.toLowerCase().startsWith(zone.toLowerCase()));
            if (propByZone.length > 0) {
                res.status(200).json(propByZone);
            } else {
                res.status(404).json({ message: "Properties not found for the given zone" });
            }
        } else {
            res.json(properties);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para buscar Property por ID
// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const property = await getPropertyNameId(id);
//         if (property) {
//             res.status(200).json(property);
//         } else {
//             res.status(404).json({ message: "Property not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Ruta para crear una nueva Property
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newPrope = req.body;
        const propeCreated = await postProperty(newPrope, res);
    
        res.status(201).json(propeCreated);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});


router.get('/getProperty',async(req,res)=>{

    try {
        
    const properties= await findAllProperties()
    res.status(200).json(properties)
     
    
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


module.exports = router;


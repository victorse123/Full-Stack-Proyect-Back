const { Router } = require("express");

const getProperties = require("../controllers/getProperties");
const getPropertyNameId = require("../controllers/getPropertyNameId");
const postProperty = require("../controllers/postProperty");
const findAllProperties= require("../controllers/findAllProperties")
const filterController=require('../controllers/filterController');
const findAllPropertiesWithPagination=require('../controllers/findWithPagination')
const filterDashboard=require('../controllers/filterDashboard')
const { Type } = require("../db");
const { READCOMMITTED } = require("sequelize/lib/table-hints");

const router = Router();

// Ruta para buscar Propiedades por zona
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


router.get('/getProperties',async(req,res)=>{

    try {
        
    const properties= await findAllProperties()
    res.status(200).json(properties)
     
    
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


router.get('/filterProperties', async (req, res) => {
    try {
        const { type, category, priceOrder, zone } = req.query;
        const page = parseInt(req.query.page) || 1;
        const pageSize=8
        const properties = await filterController(type, category, priceOrder, zone,page,pageSize);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/notIs', async (req, res) => {
    try {
        const { type, category, priceOrder, zone } = req.query;
        const page = parseInt(req.query.page) || 1;
        const pageSize=8
        const properties = await filterDashboard(type, category, priceOrder, zone,page,pageSize);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


const { Router } = require("express");

const getPropertys = require("../controllers/getPropertys");
const getPropertyNameId = require("../controllers/getPropertyNameId");
const postProperty = require("../controllers/postProperty");
const {Type} = require("../db");

const router = Router();

// Ruta para buscar Propiedades por zona
router.get("/", async (req, res) => {

    const {zone} = req.query
    try {
        const propertys = await getPropertys()
        if(zone) {
            // Buscar Property por zona 
            const prope = await propertys.filter(pro => pro.zone.toLowerCase().startsWith(zone.toLowerCase()))
            if( prope.length > 0 ) {
            res.status(200).json(prope) }
            else {
                res.status(404).json("not found")
            }

        } else {
            
            return res.json(propertys)
        }
    } catch (error) {
        res.status(500).json({error: error.messaje})
    }
});

// Ruta para buscar Property por ID
router.get("/:id", async (req, res) =>{
   
    const {id} = (req.params);
  
    try {
        // Buscar Property por ID
        const propeID = await getPropertyNameId
        res.status(200).json(propeID)


        res.status(200).json(propeID)

        res.status(200).json
    } catch (error) {
        res.status(500).json({error: error.messaje})
    }
});

// Ruta para crear una nueva Property
router.post('/', async (req, res) => {
    console.log(req.body);
    try {      
        let newPrope = req.body;        
        let propeCreated = await postProperty(newPrope, res); 

        // Busca  en la base de datos (DB)
        let typesDb = await Type.findAll({ where: { name: newPrope.type } });

        // Asocia los tipos encontrados
        await propeCreated.addType(typesDb);

        res.status(201).send('Property Creada');
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
});

module.exports = router;
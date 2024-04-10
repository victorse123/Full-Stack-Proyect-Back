const axios = require("axios");
const { Property, ServicesType } = require("../db");

const getProperty = async (req, res) => {
    try {
       
        const propeDb = await getPropertyDB();
       
        return propeDb;
    } catch (error) {
       
        res.status(400).json({ error: error.message });
    }
};

const getPropertyDB = async (req, res) => {
    try {
        const propertysDB = await Property.findAll({
            include: {
                model: ServicesType,
                attributes: ["zone"],
                through: { attributes: [] },
            },
        });

        const filterPrope = propertysDB.map((e) => {
            return {
                id: e.id,
                zone: (e.zone).charAt(0).toUpperCase() + (e.zone).slice(1),
                address: e.address,
                regions: e.regions,
                defending: e.defending,
                description: e.description,
                bedrooms: e.bedrooms,
                bathrooms: e.bathrooms,
                parking: e.parking,
                storage: e.storage,
                swimmingPool: e.swimmingPool,
                imageDefault: e.imageDefault, 
                types: e.types.map((t) => t.zone),
                createdDB: e.createdDB,
            };
        });

       
        return filterPrope;
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getProperty;
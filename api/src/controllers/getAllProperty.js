const axios = require("axios");
const { Property, ServicesType } = require("../db");

const getAllProperty = async (id) => {

    try {
       
        const { dataValues } = await Property.findByHouse(id, {
            include: {
                model: ServicesType,
                attributes: ["zone"],
                through: { attributes: [] },
            },
        });
        dataValues.zone = dataValues.zone.charAt(0).toUpperCase() + dataValues.zone.slice(1);
        dataValues.types = dataValues.types.map((e) => e.zone);

      
        return dataValues;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = getAllProperty;
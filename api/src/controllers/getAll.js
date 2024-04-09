const axios = require("axios");
const { House, Type } = require("../db");

const getHouseZoneId = async (id) => {

    try {
       
        const { dataValues } = await House.findByHouse(id, {
            include: {
                model: Type,
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

module.exports = getHouseZoneId;
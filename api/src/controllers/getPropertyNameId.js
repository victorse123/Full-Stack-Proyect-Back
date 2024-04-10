const axios = require("axios");
const { Property, ServicesType } = require("../db");

const getPropertyNameId = async (id) => {

    try {
       
        const { dataValues } = await Property.findByProperty(id, {
            include: {
                model: ServicesType,
                attributes: ["name"],
                through: { attributes: [] },
            },
        });
        dataValues.name = dataValues.name.charAt(0).toUpperCase() + dataValues.name.slice(1);
        dataValues.types = dataValues.types.map((e) => e.name);

      
        return dataValues;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = getPropertyNameId;
const { Property, Type ,Category,Sales} = require("../db");

const findAllsales = async () => {
    try {
        const sales = await Sales.findAll()
        return sales;
    } catch (error) {
        throw error;
    }
};

module.exports =  findAllsales;
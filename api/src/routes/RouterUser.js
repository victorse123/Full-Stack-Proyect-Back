const { Router } = require("express");
const createUser = require('../controllers/createUser')
const findUser=require('../controllers/findUser')
const router = Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newUser = req.body;
        const userCreated = await createUser(newUser);
    
        res.status(201).json(userCreated);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});
router.get('/', async (req, res) => {
    try {
        const { email} = req.query;
        const properties = await findUser(email);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






module.exports = router; 

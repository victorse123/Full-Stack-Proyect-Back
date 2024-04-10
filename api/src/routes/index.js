const { Router } = require('express');
const RouterProperty = require("./RouterProperty");
const RouterType = require("./RouterType");

const router = Router();

// Configurarion de los routers
router.use("/property", RouterProperty);
router.use("/tipo", RouterType);



module.exports = router;

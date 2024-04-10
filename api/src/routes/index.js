const { Router } = require('express');
const RouterProperty = require("./RouterProperty");
const RouterType = require("./RouterType");
const RouterUser = require("./RouterUser")

const router = Router();

// Configurarion de los routers
router.use("/property", RouterProperty);
router.use("/tipe", RouterType);
router.use("/user", RouterUser);
router.use("/favorite, RouterFavorite")



module.exports = router;

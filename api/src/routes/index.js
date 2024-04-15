const { Router } = require('express');
const RouterProperty = require("./RouterProperty");
const RouterType = require("./RouterType");
const RouterCategory = require("./RouterCategory");

const RouterPagination = require("./RouterPagination");
=======
const RouterFindId= require ("./RouterFindId")

// const RouterUser = require("./RouterUser");

const router = Router();

// Configurarion de los routers
router.use("/property", RouterProperty);
router.use("/type", RouterType);

router.use("/category", RouterCategory);
router.use("/pagination", RouterPagination);

router.use("/category", RouterCategory)
router.use("/propertyId",RouterFindId)

// router.use("/user", RouterUser);


module.exports = router;

const { Router } = require('express');
const RouterProperty = require("./RouterProperty");
const RouterType = require("./RouterType");
const RouterCategory = require("./RouterCategory");
const RouterUser = require('./RouterUser');
const RouterPagination = require("./RouterPagination");
const RouterFindId = require("./RouterFindId");
const RouterBooking = require("./RouterBooking");
const RouterUpdateProperty = require("./RouterUpdateProperty");
const RouterEdit = require('./RouterEdit');
const RouterReview = require('./RouterReview');
const RouterAllUser = require('./RouterAllUser');

const RouterMercado=require("./RouterMercado")
const RouterSales=require('./RouterSales')


const router = Router();

// Configurarion de los routers
router.use("/property", RouterProperty);
router.use("/type", RouterType);
router.use("/category", RouterCategory);
router.use("/pagination", RouterPagination);
router.use("/category", RouterCategory);
router.use("/propertyId" ,RouterFindId);
router.use("/user", RouterUser);
router.use('/booking', RouterBooking);
router.use('/update', RouterUpdateProperty);
router.use("/edit",RouterEdit);
router.use("/review",RouterReview );
router.use("/users", RouterAllUser)


router.use("/createPreference",RouterMercado);
router.use('/sales',RouterSales);


module.exports = router;

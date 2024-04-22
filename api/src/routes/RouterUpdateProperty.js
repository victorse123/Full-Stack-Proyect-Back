const { Router } = require('express');
const putProperty = require("../controllers/putProperty");

const router = Router();

// Definir la ruta para actualizar una propiedad por su ID
router.put('/:id', putProperty);

module.exports = router;
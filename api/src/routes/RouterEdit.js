
const { Router } = require("express");
const putProperty=require("../controllers/putEditProperty")
const router = Router();


router.put("/:propertyId",async (req, res,) => {
    const propertyId = req.params.propertyId; // Obtener el ID de la propiedad de los parámetros de la URL
    const updatedPropertyData = req.body; // Obtener los datos actualizados de la propiedad del cuerpo de la solicitud

    try {
        // Llamar al servicio putProperty para actualizar la propiedad en la base de datos
        const updatedProperty = await putProperty(propertyId, updatedPropertyData);

        // Enviar una respuesta con la propiedad actualizada
        res.json(updatedProperty);
    } catch (error) {
        // Manejar cualquier error y pasarlo al middleware de manejo de errores
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
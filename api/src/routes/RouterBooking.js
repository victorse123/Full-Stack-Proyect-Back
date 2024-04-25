const { Router } = require('express');
const postBookingController = require('../controllers/postBooking');

const router = Router();

// Ruta para realizar una reserva
router.post('/', postBookingController.realizarReserva);

module.exports = router;
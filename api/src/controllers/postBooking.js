const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

exports.realizarReserva = async (req, res) => {
  
  const { destinatario, propiedad, name } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: 'Confirmación de reserva',
    text: `Hola ${name}, has reservado la propiedad ${propiedad}. Gracias por tu reserva.`
  };

try {
    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ' + info.response);
    res.status(200).send('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).send('Error al enviar el correo electrónico.');
  }
};
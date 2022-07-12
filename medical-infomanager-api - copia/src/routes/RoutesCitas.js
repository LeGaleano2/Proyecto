const {Router} = require('express');
const router = Router();

const {body, check, query} = require('express-validator');
const ControllerCitas = require('../controllers/ControllerCitas');
// const AuthenticationController = require('../Controllers/AuthenticationController');
//Setting up routes

router.get('/', ControllerCitas.HomeCitas);

router.get('/ListCitas', ControllerCitas.ListCitas);

router.post('/SaveCita', 
body("id_paciente").isInt({ min: 1 }).withMessage("Debe proporcionar un ID de Paciente Correcto."),
body("id_persona").isInt({ min: 1 }).withMessage("Debe proporcionar un ID de Médico Correcto."),
body("num_turno").isInt({ min: 1 }).optional({ nullable: true }).withMessage("Debe proporcionar un Turno correcto."),
body("fecha_agenda").matches(/^(\d{4})\-(\d{2})\-(\d{2})$/).withMessage('El formato de fecha es YYYY-MM-DD'),
body("fecha_cita").matches(/^(\d{4})\-(\d{2})\-(\d{2})$/).withMessage('El formato de fecha es YYYY-MM-DD'),
check('estado_cita', 'Debe proporcionar un valor de estado correcto (COM, PEN, CAN)').notEmpty(),
ControllerCitas.SaveCita);

router.put("/UpdateCita",
query("id_cita").isInt({ min: 1 }).withMessage("Debe proporcionar un ID de Cita Correcto."),
body("num_turno").isInt({ min: 1 }).optional({ nullable: true }).withMessage("Debe proporcionar un Turno correcto."),
body("fecha_cita").matches(/^(\d{4})\-(\d{2})\-(\d{2})$/).withMessage('El formato de fecha es YYYY-MM-DD'),
check('estado_cita', 'Debe proporcionar un valor de estado correcto (COM, PEN, CAN)').notEmpty(),
ControllerCitas.UpdateCita);

router.put("/DeleteCita",
query("id_cita").isInt({ min: 1 }).withMessage("Debe proporcionar un ID de Cita Correcto."),
ControllerCitas.DeleteCita);

module.exports = router;
const {Router} = require('express');
const router = Router();

const {body, check, query} = require('express-validator');
const ControllerMedicos = require('../controllers/ControllerMedicos');

//Listar medicos
router.get('/', ControllerMedicos.HomeMedicos);

router.get('/ListMedicos', ControllerMedicos.ListMedicos);

router.post('/SaveMedico', 
body("nombre_persona").isLength({ max: 70 }).withMessage("La longitud max del nombre y apellido del personal es de 70 caracteres"),
body("nombre_persona").matches(/^([a-zA-zá-úÁ-Ú\ \_]+)$/, "g").withMessage("El nombre debe incluir sólo caracteres alfabéticos y sin numeros."),
body("telefono_persona")
.isLength({ max: 9 }).withMessage("El número telefónico debe contener 9 digitos")
.isMobilePhone().withMessage("El número telefónico debe contener sólo números"),
check('especialidad_medica', 'Debe proporcionar un valor de especialidad medica que solo incluya lo que se muestre (Ninguno,Psiquiatría', 'Urólogo', 'Oftalmólogo', 'Pediatra', 'Ortopedista', 'Dermatólogo) ').notEmpty(),
check('estado_persona', 'Debe proporcionar un valor de estado que solo incluya lo que se muestre (ACT, INA)').notEmpty(),
check('cargo_persona', 'Debe proporcionar un valor de estado que solo incluya lo que se muestre (ADM, MED, REC, DSP)').notEmpty(),

body("num_consultorio").isNumeric().withMessage("Debe agregar únicamente numeros"),
body("email_persona").isEmail().withMessage("Correo Electrónico Incorrecto"),
body("contrasena")
.isLength({ min: 6, max: 15 })
.withMessage("La longitud mínima de la contraseña es de 6 caracteres")
.isStrongPassword()
.withMessage("La contraseña debe incluir al menos un caracter en minúscula, mayúscula, un número y un caracter especial"),
/*
body("verificarContrasenaUsuario").custom((value, { req }) => {
    if (value !== req.body.contrasena) {
      throw new Error("La contraseña no coincide");
    }
    return true;
  })*/

ControllerMedicos.SaveMedico);

router.put("/UpdateMedico",
query("id_persona").isInt({ min: 1 }).withMessage("Debe proporcionar un ID de medico Correcto."),
body("nombre_persona").isLength({ max: 70 }).withMessage("La longitud max del nombre y apellido del medico es de 35 caracteres"),
body("nombre_persona").matches(/^([a-zA-zá-úÁ-Ú\ \_]+)$/, "g").withMessage("El nombre debe incluir sólo caracteres alfabéticos y sin numeros."),
body("telefono_persona")
.isLength({ max: 9 }).withMessage("El número telefónico debe contener minimo 9 digitos")
.isMobilePhone().withMessage("El número telefónico debe contener sólo números"),
check('especialidad_medica', 'Debe proporcionar un valor de especialidad medica que solo incluya lo que se muestre (Ninguno,Psiquiatría', 'Urólogo', 'Oftalmólogo', 'Pediatra', 'Ortopedista', 'Dermatólogo) ').notEmpty(),
check('estado_persona', 'Debe proporcionar un valor de estado que solo incluya lo que se muestre (ACT, INA)').notEmpty(),
check('cargo_persona', 'Debe proporcionar un valor de estado que solo incluya lo que se muestre (ADM, MED, REC, DSP)').notEmpty(),
body("num_consultorio").isNumeric().withMessage("Debe agregar únicamente numeros"),

body("contrasena")
.isLength({ min: 6, max: 15 })
.withMessage("La longitud mínima de la contraseña es de 6 caracteres")
.isStrongPassword()
.withMessage("La contraseña debe incluir al menos un caracter en minúscula, mayúscula, un número y un caracter especial"),
ControllerMedicos.UpdateMedico);

router.delete("/DeleteMedico",

query("id_persona").isInt({ min: 1 }).withMessage("Debe proporcionar un ID de Medico Correcto para poder eliminarlo."),
ControllerMedicos.DeleteMedico);

module.exports = router;
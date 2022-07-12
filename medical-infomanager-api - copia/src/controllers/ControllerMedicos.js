const ModelMedicos = require('../models/ModelMedicos');
const {validationResult} = require('express-validator');
const msg = require('../components/ResponseMessage');
const { update } = require('../models/ModelMedicos');
const verifyPassword = new ModelMedicos();
exports.HomeMedicos = async (req, res) => {
    res.send("Home Page - Medicos Administration");
};

//Listar medicos
exports.ListMedicos = async (req, res) => {
    let MedicosList = await ModelMedicos.findAll();  

    if(MedicosList == ""){
        msg("INFO: No existen [Medicos] en B.D.", 500, [], res);
    }else{
        msg("INFO: Lista de [Medicos]", 200, MedicosList, res);
    }
};

//Guardar nuevos datos de un medico
exports.SaveMedico = async(req, res)=>{
    const dataValidation = validationResult(req);

    const {id_persona, nombre_persona,telefono_persona, email_persona,foto_persona,estado_persona,num_consultorio, cargo_persona,especialidad_medica,
    horario_consultorio, contrasena, pin_recuperacion} = req.body;

    if (!dataValidation.isEmpty()) {
        msg("Compruebe los Datos Otorgados.", 500, dataValidation.array(), res);
    }else{
        await ModelMedicos.create({
          
            id_persona,
            nombre_persona,
            telefono_persona,
            email_persona,
            foto_persona,
            estado_persona: 'ACT',
            num_consultorio,
            cargo_persona,
            especialidad_medica,
            horario_consultorio,
            contrasena,
            pin_recuperacion

        }).then((data)=>{
            msg("Datos del medico registrado exitosamente", 200, data, res);
        }).catch((error)=>{
            msg("Hubo un error al guardar los datos del medico", 500, error, res);
        });
    }
};


//Actualizar datos del medico
exports.UpdateMedico = async(req, res)=>{
    const dataValidation = validationResult(req);
    const {id_persona} = req.query;
    const {nombre_persona, 
              telefono_persona,
              email_persona, 
              foto_persona,
              estado_persona, 
              num_consultorio, 
              cargo_persona, 
              especialidad_medica,
              horario_consultorio,
              contrasena,
              pin_recuperacion
            } = req.body;

    if (!dataValidation.isEmpty()) {
        msg("Compruebe los Datos Otorgados.", 500, dataValidation.array(), res);
    }else{

        //encontrar el id del medico
        let findByID = await ModelMedicos.findOne({
            where:{
                id_persona: id_persona
            }
        });

        if (!findByID) {
            msg("Los datos del medico solicitado no existe o se encuentra cancelado.", 500, [], res);
        }else{

            if (nombre_persona != null) {
                findByID.nombre_persona = nombre_persona;
            }

            if (telefono_persona != null){
                findByID.telefono_persona = telefono_persona;
            }

            
            if (email_persona != null){
                findByID.email_persona = email_persona;
            }

            if (foto_persona != null){
                findByID.foto_persona = foto_persona;
            }

            if (estado_persona != null){
                findByID.estado_persona = estado_persona;
            }

            if (num_consultorio != null){
                findByID.num_consultorio = num_consultorio;
            }

            if (cargo_persona != null){
                findByID.cargo_persona = cargo_persona;
            }
        
            if (especialidad_medica != null){
                findByID.especialidad_medica = especialidad_medica;
            }
           
            if (horario_consultorio != null){
                findByID.horario_consultorio = horario_consultorio;
            }

            if(contrasena!=null){
                findByID.contrasena = contrasena;
            }

            if(pin_recuperacion!=null){
                findByID.pin_recuperacion = pin_recuperacion;
            }
            

            await findByID.save().then((data) => {
                msg("Los datos que se ha hecho cambios, se actualizó correctamente.", 200, data, res);
                
            }).catch((error)=>{
                msg("Hubo un error al Actualizar los datos del Medico", 500, error, res);
            });
        }
    }
};

//Eliminar datos del medico
exports.DeleteMedico = async (req, res) => {
    const dataValidation = validationResult(req);
    const {id_persona} = req.query;

    if (!dataValidation.isEmpty()) {
        msg("ERROR: Compruebe los Datos Otorgados.", 500, dataValidation.array(), res);
    }else{
        let findExtraByID = await ModelMedicos.findOne({
            where:{
                id_persona:id_persona,
            }
        });

        if (!findExtraByID) {
            msg("Los datos del medico solicitado no existe o se encuentra cancelado.", 500, [], res);
        }else{
            if (findExtraByID.estado_persona == "INA") {
                msg("El medico ya se encuentra Inactivo", 500, [], res);
              } else {
                findExtraByID.estado_persona = "INA";
    
                await findExtraByID
                  .save()
                  .then((data) => {
                    msg("Medico eliminado", 200, data, res);
                  })
                  .catch((error) => {
                    msg("Error al eliminar el medico", 500, error, res);
                  });
              }
        }
    }
}
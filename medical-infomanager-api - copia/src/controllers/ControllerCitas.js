const ModelCitas = require('../models/ModelCitas');
const ModelMedicos = require('../models/ModelMedicos');
const {validationResult} = require('express-validator');
const msg = require('../components/ResponseMessage');

exports.HomeCitas = async (req, res) => {
    res.send("Home Page - Citas Administration");
};

exports.ListCitas = async (req, res) => {
    let CitasList = await ModelCitas.findAll({
        include:[{
            association: "info_medico",
            attributes:["nombre_medico"],
        }]
    });  

    if(CitasList == ""){
        msg("INFO: No existen [Citas] en B.D.", 500, [], res);
    }else{
        msg("INFO: Lista de [Citas]", 200, CitasList, res);
    }
};

exports.SaveCita = async(req, res)=>{
    const dataValidation = validationResult(req);

    const {id_paciente, id_persona, num_turno, fecha_agenda, fecha_cita, estado_cita} = req.body;

    if (!dataValidation.isEmpty()) {
        msg("Verifique los Datos Proporcionados.", 500, dataValidation.array(), res);
    }else{

        let findPersonalByID = await ModelMedicos.findOne({
            where:{
                id_persona: id_persona,
                estado_medico:'ACT'
            }
        });

        if (!findPersonalByID) {
            msg("El Médico no Esta Registrado o su estado es Inactivo", 500, dataValidation.array(), res);
        }else{
            await ModelCitas.create({
                id_paciente,
                id_persona,
                num_turno,
                fecha_agenda,
                fecha_cita,
                estado_cita:'PEN',
    
            }).then((data)=>{
                msg("Cita registrada exitosamente", 200, data, res);
            }).catch((error)=>{
                console.error(error);
                msg("Hubo un error al Agendar la Cita", 500, error, res);
            });
        }
    }
};

exports.UpdateCita = async(req, res)=>{
    const dataValidation = validationResult(req);

    const {id_cita} = req.query;
    const {num_turno, fecha_cita, estado_cita} = req.body;

    if (!dataValidation.isEmpty()) {
        msg("Verifique los Datos Proporcionados.", 500, dataValidation.array(), res);
    }else{

        let findByID = await ModelCitas.findOne({
            where:{
                id_cita: id_cita
            }
        });

        if (!findByID) {
            msg("La Cita solicitada no existe o se encuentra cancelada.", 500, [], res);
        }else{

            if (num_turno != null) {
                findByID.num_turno = num_turno;
            }
            if (fecha_cita != null){
                findByID.fecha_cita = fecha_cita;
            }
            if (estado_cita != null){
                findByID.estado_cita = estado_cita;
            }
            
            await findByID.save().then((data) => {
                msg("Cita actualizada correctamente", 200, data, res);
                
            }).catch((error)=>{
                msg("Hubo un error al Actualizar la Cita", 500, error, res);
            });
        }
    }
};

exports.DeleteCita = async (req, res) => {
    const dataValidation = validationResult(req);
    const {id_cita} = req.query;

    if (!dataValidation.isEmpty()) {
        msg("ERROR: Verifique los datos proporcionados.", 500, dataValidation.array(), res);
    }else{
        let findExtraByID = await ModelCitas.findOne({
            where:{
                id_cita:id_cita,
            }
        });

        if (!findExtraByID) {
            msg("La Cita solicitada no existe o se encuentra cancelada.", 500, [], res);
        }else{
            findExtraByID.estado_cita = 'NA';

            await findExtraByID.save().then((data) => {
                msg("La cita fue cancelada exitosamente.", 200, data, res);  
            }).catch((error)=>{
                msg("Hubo un error al Cancelar la Cita", 500, error, res);
            });
        }
    }
}
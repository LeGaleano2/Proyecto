const sequelize = require('sequelize');
const DBLink = require('../config/DBLink');
const ModelMedicos = require('./ModelMedicos');

const citas = DBLink.define(
    "citas",
    {
        id_cita:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        id_paciente:{
            type: sequelize.INTEGER,
            allowNull: false    
        },
        id_persona:{
            type: sequelize.INTEGER,
            allowNull: false    
        },
        num_turno:{
            type: sequelize.INTEGER,
            allowNull: true   
        },
        fecha_agenda:{
            type: sequelize.DATEONLY,
            allowNull: false   
        },
        fecha_cita:{
            type: sequelize.DATEONLY,
            allowNull: false   
        },
        estado_cita: {
            type: sequelize.ENUM('COM', 'PEN', 'CAN'),
            allowNull: false
        }
    }, 
    
    {
        tableName: "citas",
        timestamps: false,
    }
);

/* CITAS */
citas.hasOne(ModelMedicos, {
    sourceKey: 'id_persona',
    foreignKey: "id_persona",
    as:"info_medico"
});

ModelMedicos.hasMany(citas, {
    sourceKey: 'id_persona',
    foreignKey: "id_persona",
});

/* ---------------------- */




module.exports = citas;

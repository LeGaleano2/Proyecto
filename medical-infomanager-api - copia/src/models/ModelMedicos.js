const sequelize = require('sequelize');
const DBLink = require('../config/DBLink');
const bcrypt = require('bcrypt');
//Tabla de medicos
const personal = DBLink.define(
    "personal",
    {
        
        id_persona:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
      
        nombre_persona:{
            type: sequelize.STRING(70),
            allowNull:false
        },

        telefono_persona:{
            type: sequelize.STRING(9),
            allowNull:true
        },

        email_persona:{
            type: sequelize.STRING(60),
            allowNull:true
        },

        foto_persona:{
            type: sequelize.STRING(100),
            allowNull:true
        },
    
        estado_persona: {
            type: sequelize.ENUM('ACT', 'INA'),
            allowNull: false
        },

        num_consultorio:{
            type: sequelize.INTEGER,
            allowNull: false   
        },

        cargo_persona:{
            type: sequelize.ENUM('ADM', 'MED', 'REC', 'DSP'),
            allowNull: false
        },

        especialidad_medica:{
            type: sequelize.ENUM('Ninguno','Psiquiatría', ' Urólogo', 'Oftalmólogo', 'Pediatra', 'Ortopedista', 'Dermatólogo'),
            allowNull: true
        },

        horario_consultorio:{
            type: sequelize.STRING(100),
            allowNull: true   
        },

        contrasena:{
            type: sequelize.STRING(600),
            allowNull: false
        },

        pin_recuperacion:{
            type: sequelize.STRING(4),
            allowNull: true
        }
        
    }, 
    
    {
        tableName: "personal",
        timestamps: false,
        hooks: {
            beforeCreate(personal) {
                const hash = bcrypt.hashSync(personal.contrasena, 10);
                personal.contrasena = hash;
            },

            beforeUpdate(personal){
                const hash = bcrypt.hashSync(personal.contrasena, 10);
                personal.contrasena = hash;
        }
    },
},////////////////////////////////////////////
    
);

personal.prototype.verifyPassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword);
}

personal.prototype.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

module.exports = personal;

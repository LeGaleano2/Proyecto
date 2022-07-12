const sequelize = require('sequelize');

const dbHandler = new sequelize(
    process.env.DB_NAME, //Database Name
    process.env.DB_USER, //DB User
    process.env.DB_SECRET, //DB User Password
    {
        host: process.env.DB_HOST, // Or Server IP
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        dialectOptions: {
            useUTC: false, //for reading from database
            dateStrings: true,
            typeCast: function(field, next) { // for reading from database
                if (field.type === 'DATEONLY' || field.type === 'DATETIME') {
                    return field.string()
                }
                return next()
            },
        },
        timezone: '-06:00'
    }
);

module.exports = dbHandler;
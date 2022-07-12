const passport = require('passport');
// const UserModel = require('../Models/UserModel');

/*Passport and JWT*/
const strategyJWT = require('passport-jwt').Strategy;
const extractionJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const TTL = moment.duration(50, "m").asSeconds();
const secret = "MEIM220220222345G4";

exports.getToken = (data) => {
    return JWT.sign(data, secret, {expiresIn: TTL});    
};
const options = {};

options.jwtFromRequest = extractionJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = secret;

passport.use(new strategyJWT(options, async(payload, done)=>{
    return await UserModel.findOne({
        where: {
            NombreUsuario: payload.NombreUsuario,
            EstadoPersona: 'Activo'
        }
    })
    .then((data) =>{
        return done(null, data.NombreUsuario);
    })
    .catch((error)=>{
        return done(null, false);
    });
}));

exports.validateAuthentication = passport.authenticate('jwt', {session: false, failureRedirect: '/api/authentication/error/'});
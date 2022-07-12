// Server config
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

app.use(morgan('dev'));

/*WEB WEB WEB */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces', 2);

app.use('/api/', require('./routes'));
app.use('/api/citas', require('./Routes/RoutesCitas'));
app.use('/api/medicos', require('./Routes/RoutesMedicos'));

app.listen(5000, () => {console.log("Server Running on Port 5000")});

/*
 * File contains all the setup for the Express server. The final line of
 * app.listen() is in the init.js file for testing purposes
 */

import express from "express"
import bodyParser from "body-parser"
import mongoose from 'mongoose';
import morgan from 'morgan';
import methodOverride from 'method-override';
import config from './config';

//const cors = require('cors')({origin: true});
/*
 * Just in case CORS is necesssary
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// app.use(cors(corsOptions));
app.use(cors);
*/

// Can customize port on CLI by doing `node build/init.js PORT_NUMBER`
const port = process.argv[2] || config.port;

const app = express();
app.use(morgan('dev'));
// Allow JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect(config.db);

//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

import routes from './routes';
app.use('/', routes);
// import routes from ./routes.js
// require('./routes')(app, db);

// Generic error handling
app.use(catchError);
function catchError(err, req, res, next) {
  res.status(500).send({ error: err.message });
}

module.exports = app;

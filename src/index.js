const express = require('express');
// var http = require("http");
// var url = require("url");
// var querystring = require("querystring");
// var consts = require("./utils/consts");
// var firebase = require("../libs/firebase");

// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');

// https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv');
dotenv.config();

// https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose');

// Objecto que instancia todas las rutas del archivo de aprendizaje de rutas /routes/index.js
// const routes = require('./routes');
const routesUServ1 = require('./routes/v1');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes(app);
routesUServ1(app);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conected to Mongo')
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, function() {
      console.log('running on ', PORT);
    });
  })
  .catch(err => {
    console.log('ERR', err);
  });

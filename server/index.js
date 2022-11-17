require('dotenv').config()
const express = require('express')
require('./config/db')
const app = express()
const routes = require('./routes/index')
const bodyParser = require("body-parser");
app.use('/data', express.static('images'))
// for swagger
const swaggerJson = require('./swager/node-api-29-01-22.postman_collection.json-Swagger20.json')
const swaggerUi = require("swagger-ui-express");


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(
    bodyParser.json({
        limit: '1024mb',
    }),
)
app.use(
    bodyParser.urlencoded({
        limit: '1024mb',
        extended: true,
    }),
)
// api routes
app.use('/api', routes)
// write process.env.PORT || 3000 because the PORT will be assigned dynamically from the server when we host the application
// for local development we will use the port 3000
const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`The web server has started on port ${port}`);
});


// hello 
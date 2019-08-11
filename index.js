const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
const port = 3000;
// To parse incoming post requests url encoded or json...
const bodyParser = require('body-parser');
//import routes
const userRoutes = require('./api/routes/users');
const bookRoutes = require('./api/routes/books');
//Parsing incoming requests of both forms(url encoded and json)
app.use(bodyParser.urlencoded({extended:false }));
app.use(bodyParser.json());
app.use(helmet());
//mongoose config
mongoose.connect("mongodb://priyanshunayan:Kamalnayan1@ds257054.mlab.com:57054/kaizen")
.then(() => console.log('connected to mongodb'))
.catch(() => console.log('can not connect to mongodb'));
mongoose.Promise = global.Promise;

// To remove CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Routes Handling
app.use('/user', userRoutes);
app.use('', bookRoutes);
//routes which don't match the above routes will pass through this and give error.
app.use((req, res, next) => {
    const error  = new Error('Not Found');
    error.status = 404;
    next(error);
})
//Errors like Database query failed will pass through this.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

//App listening
app.listen(port, () => console.log(`App listening on the port ${port}`));

module.exports = app;

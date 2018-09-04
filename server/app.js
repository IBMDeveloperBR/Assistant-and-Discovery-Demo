require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const compress = require('shrink-ray');
const watson = require('./watson');

const ENV = process.env.NODE_ENV;

const app = express();

app.use(compress({
    cache: (req, res) => {
        return true;
    },
    brotli: {
        quality: 6
    },
    zlib: {
        quality: 6
    }
}));

dotenv.config();
app.use(morgan(process.env.NODE_ENV || 'dev'));
app.use(cors());

//helmet config
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');


// Point static path to dist
app.use(express.static(path.join(__dirname, '../public'))); // load UI from public folder

//body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//production https redirect
if(ENV === 'production'){
    app.enable('trust proxy');

    app.use ((req, res, next) => {
        if (req.secure || process.env.BLUEMIX_REGION === undefined) {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
}

// Rota que sera consumida pelo front para obter respostas do chatbot
app.post('/api/message', (req, res, next) => {
    const msg = req.body.input;
    const context = req.body.context;
    watson.assistant.message(msg, context)
        .then((responseAssistant) => {
            require('./handlers').addDiscoveryResponse(responseAssistant, msg)
                .then((finalResult) => res.json(finalResult))
                .catch((err) => next({err, status: 500, msg: 'Error on Watson Discovery Request'}))
        })
        .catch(err => next({err, status: 500, msg: 'Error on Watson Assistant Request'}))
});


//Error handler
app.use((err, req, res, next) => {
    if(err.err) {
        console.error('\x1b[31m', '[SERVER] ' + err.err);
        res.status(err.status || 500).json({result: err.msg});
    }
    next();
});

module.exports = app;
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        //only origins in array can access backend rest api, or localhost
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    //true handles headers
    credentials: true,
    optionsSuccessStatus: 200 
}

module.exports = corsOptions
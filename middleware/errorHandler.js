const {logEvents} = require('./logger');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    //err.stack will give a large amount of detail about the error and where it is at
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500
    res.status(status);

    res.json({'message': err.message})
}

module.exports = errorHandler;
const { format } = require('date-fns');
const {v4: uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try{
        //if the folder does not exist, create it
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        //if it does exist, append logItem to the file name given
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch(err){
        console.log(err);
    }
}

//the actual middleware
//every middle ware requires req, res, and NEXT
const logger = (req, res, next) => {
    //req.log, req.method, and req.headers.origin is sent to logEvents as the message
    //reqLog.log is sent as the file name, .log is like a text file
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`)
    next();
}

module.exports = {logEvents, logger}
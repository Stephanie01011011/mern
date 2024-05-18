require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
//process.env.PORT will find port variable if there is one in the deployment or use local port 3500
const PORT = process.env.PORT || 3500;
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logEvents } = require('./middleware/logger')
const cors = require('cors');

connectDB()

//allows outside sources to make requests to your api
app.use(cors(corsOptions));

//lets app recieve and parse JSON, VERY IMPORTANT
app.use(express.json());

//third party middleware
app.use(cookieParser());

//custom middleware
app.use(logger);

//look inside folder we're in now, then look inside public for static files (css images)
//built in middleware
app.use('/', express.static(path.join(__dirname, 'public')));
//this also works => app.use(express.static('public'))

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))

app.use('/notes', require('./routes/noteRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({ 'message': '404 not found'})
    } else {
        res.status(404).send('404 not found')
    }
})

//use error handler all the way below everything except for the listener.
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

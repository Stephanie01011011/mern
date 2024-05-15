const express = require('express');
const app = express();
const path = require('path');
//process.env.PORT will find port variable if there is one in the deployment or use local port 3500
const PORT = process.env.PORT || 3500

//look inside folder we're in now, then look inside public for static files (css images)
//built in middleware
app.use('/', express.static(path.join(__dirname, 'public')));
//this also works => app.use(express.static('public'))

app.use('/', require('./routes/root'))

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

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
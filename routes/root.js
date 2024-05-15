const express = require('express');
const router = express.Router()
const path = require('path');

//.html is optional
//send index page
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

module.exports = router;
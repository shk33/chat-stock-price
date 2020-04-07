const express = require('express');
const router = express.Router();
const { getMessagesByRoom } = require('./controllers/messages');

router.get('/', (req, res) => {
    res.send('Server Up and running');
});

router.get('/messages/:room', getMessagesByRoom);

module.exports = router;
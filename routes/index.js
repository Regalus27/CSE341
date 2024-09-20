const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/users', require('./users.js'));

module.exports = router;
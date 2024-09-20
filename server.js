const express = require('express');

const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 5959;

app.use('/', require('./routes/index.js'));

mongodb.initDb((e) => {
    if(e) {
        // error logging
        console.log(e);
    }
    else {
        app.listen(port, () => {console.log(`Listening on port ${port}`)});
    }
})
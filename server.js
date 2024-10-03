const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 5959;

// Allows reading body of requests
app.use(bodyParser.json());
// Compatability
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Controll-Allow-Methods', 'Get, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', require('./routes/index.js'));

// Error Handling (catch all)
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((e) => {
  if (e) {
    // error logging
    console.log(e);
  } else {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
});

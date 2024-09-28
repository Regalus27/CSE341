const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'https://cse341-0z9m.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
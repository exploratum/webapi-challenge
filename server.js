const express = require ('express');
const server = express();

const cors = require('cors');

const projectRouter = require('./api/projectRouter.js');
const actionRouter = require('./api/actionRouter.js');


server.use(logger);
server.use(express.json());
server.use(cors({origin:'*'}));



server.get('/', () => {
    console.log("Server is listening on localhost://4000")
});


server.use('/projects', projectRouter);
server.use('/actions', actionRouter);




/**************************************/
/*      Custom Middleware             */
/**************************************/

function logger(req, res, next) {
    console.log(`Method: ${req.method} requested at URL: ${req.url} on ${new Date().toISOString()}`);
    next();
} 




module.exports = server;
const restify = require('restify'),
    server = restify.createServer(),
    mongoose = require('mongoose'),
    config = require('./config'),
    log = console.log;

// Create restify server using body parser middleware
server.use(restify.plugins.bodyParser());

// Start the server and connect to mongoose
server.listen(config.PORT, err => {
    err ? log(`An error has occurred trying to connect to port: ${config.PORT}`) : mongoose.connect(config.URI, {useNewUrlParser: true});
});

// Create mongoose connection variable to check for connection errors
const db = mongoose.connection;

db.on('error', err => log(`Error has occurred when trying to connect to the DB ${err}`));

db.on('open', () => {
    require('./routes/customers')(server);  // Pass in the server instance to fetch routes
    log(`Server started on port: ${config.PORT}`);
});

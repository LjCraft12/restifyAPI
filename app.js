const restify = require('restify'),
    server = restify.createServer(),
    mongoose = require('mongoose'),
    config = require('./config'),
    log = console.log,
    rjwt = require('restify-jwt-community');

// Create restify server using body parser middleware
server.use(restify.plugins.bodyParser());

// Protect routes unless it is the auth route
server.use(rjwt({
    secret: config.JWT_SECRET
}).unless({path: ['/auth']}));

// Start the server and connect to mongoose
server.listen(config.PORT, err => {
    err ? log(`An error has occurred trying to connect to port: ${config.PORT}`) : mongoose.connect(config.URI, {useNewUrlParser: true});
});

// Create mongoose connection variable to check for connection errors
const db = mongoose.connection;

db.on('error', err => log(`Error has occurred when trying to connect to the DB ${err}`));

db.on('open', () => {
    require('./routes/customers')(server);  // Pass in the server instance to fetch customer routes
    require('./routes/users')(server);  // Pass in the server instance to fetch user routes
    log(`Server started on port: ${config.PORT}`);
});

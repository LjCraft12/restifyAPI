const errors = require('restify-errors'),
    Customer = require('../models/Customer');

// GET the customers router and fetch all the customers in the DB => localhost:3000/customers
module.exports = server => {
    // async function to query customers from the DB
    server.get('/customers', async (req, res, next) => {
        try {
            // customer variable that will hold all the customers once the query is finished try/catch for handling errors
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (err) {
            // Use invalid content error from restify-errors
            return next(new errors.InvalidContentError(err));
        }
    });
// Add new customers
    server.post('/customers', async (req, res, next) => {
        // Check to ensure the content type is JSON format
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json' "));
        }

        // Object destruction of the incoming request to the api
        const {name, email, balance} = req.body;
        // Create new customer with the deconstructed incoming post
        const customer = new Customer({
            name,
            email,
            balance
        });
        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    // Get a single customer from the DB by their id
    server.get('/customers/:id', async (req, res, next) => {
        const id = req.params.id;
        try {
            // customer variable that will hold the single returned customer.
            const customer = await Customer.findById(id);
            res.send(customer);
            next();
        } catch (err) {
            // Use invalid resource error from restify-errors
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${id}`));
        }
    });
// Update Customer
    server.put('/customers/:id', async (req, res, next) => {
        const id = req.params.id;
        // Check to ensure the content type is JSON format
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json' "));
        }
        // Update the customer by their id and update their information with the incoming request
        try {
            const customer = await Customer.findOneAndUpdate({_id: id}, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${id}`));
        }
    });

// Delete customer
    server.del('/customers/:id', async (req, res, next) => {
        const id = req.params.id;
        try {
            const customer = await Customer.findOneAndDelete({_id: id});
            res.send(204);
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${id}`));
        }
    })
};

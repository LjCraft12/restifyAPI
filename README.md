# restifyAPI

#### Restify API Application using restify

## Technologies used
1. restify [Restify Documentation](http://restify.com/).
2 restify-jwt-community for JSON web token
3. restify-errors for error handling while using restify
4. Mongo and Mongoose as the CRM
5. bcrypt to hash user passwords so not to save them as plain text

## What I learned
1. Greater working knowledge of building a RESTful API.
2. Restify gained knowledge on how to use another framework based on express.
3. More understanding of how to use JSON web tokens to authenticate a user and protecting routes from un-authorized users
4. async / await I now understand more on how to use the javascript async / await with try{} catch{} blocks instead or the typical .then() .catch() when working with promises
5. Deeper learning and usage of es6

## Plan to do
I plan on using this api to create a Vuejs or Angular app to go on top of it and create a full working web application.

#### How to run
* You will need postman installed on your machine or the chrome extension for it
* Mongo Cloud Atlas account.
* In the root directory of the project you will need to create a new config.js file.
![config.js](https://imgur.com/esikhlw "Config Setup")

* Clone the repo: https://github.com/LjCraft12/restifyAPI.git
* Either open the repo in your IDE or in your terminal and run: 
``` 
npm i
```
This will install the the dependencies for the project

Aftter the installation finishes you can start the server with:
```npm run dev```
this will open a port on your machine at [localhost:3000](localhost:3000).
Avaliable routes are (routes are being used by postman there is no front facing web app):

* GET localhost:3000/customers
* Get localhost:3000/customers/id <- where id is the _id created by mongoose when a new customer is created and will return a single user.
* POST localhost:3000/customers <- this route will allow you to create a new user (if you are a registered user).
* Delete localhost:3000/customers/id <- Again the id is the _id created by mongoose this route will delete the customer from the DB.

* POST localhost:3000/register <- This route will allow you to register a new user that can then make a new customer.
* POST localhost:3000/auth <- Passing in any created user will return you user and their token

### Creating a new user
1. Open up postman
2. Set the request type to POST. the route should be ```localhost:3000/register``` and set the headers to: ```Content-Type``` ```application/json```.
![postman header](https://imgur.com/E8ROHPA "Postman Header Setup")
3. In the body tab set the type to ```raw``` you will also need to then create a new user in JSON format with an email and password (Both are strings).
![postman body](https://imgur.com/Fwg05ak "Postman Body Setup")
4. After sending it off you can check your Mongo Cloud Atlas cluster collections for the newly created user.
![db registered users](https://imgur.com/EEilkir "Atlas DB registered users")

### Creating a customer
Now that you have a user registered you can create a new customer.
1. In post man set the request type to POST. The route should be ```localhost:3000/customers``` and set the headers to: ```Content-Type``` ```application/json```.
![New customer header](https://imgur.com/QiAbT6I "New customer header")
2. You will then need to get the ```users``` token. You can do this by opening a new tab in postman point at the route ````localhost:3000/auth```` and set the request type to POST.
![retrieving the token of a user](https://imgur.com/pjcMFSa "User token")
3. Copy the token that has been retrieved and paste it in the POST request tab for creating a new customer. The ```key``` will need to be set to ```Authorization``` and the value is set to: jwt <your token> (don't forget the space between jwt and the token you paste in).
![token acquired](https://imgur.com/1RAWMjS "token acquired").
5. In the body tab set the type to ```raw``` customers are also created in a json format with name, email, and the optional balance (name and email are both strings the balance is a type of number and if left blank the default balance will be 0).
![New customer body](https://imgur.com/uoHzYhb "New customer body")
6. You should then check you work with looking back into your atlas cluster to see if a new collection called customers was created.
![New customer](https://imgur.com/AbLBRbz "New customer")

### Updating a customer
Now that you have a customer in the DB its time to update. (All steps will require you to have a token already set refer to creating a customer if you need a new token and the header still needs to have a ```Content-Type``` ```application/json```)
1. In post man set the request type to PUT. The route should be ```localhost:3000/customers/id``` (again where id is the _id created by mongoose this can be found in the db or by retrieving the list of users).
![Getting user id](https://imgur.com/ZtDauXu "Getting user id")
![Updating customer](https://imgur.com/hhCknT9 "Updating Customer")
2. You can either update the whole user or just a single part of the user such as just their name, email or password.
![Changing values](https://imgur.com/hhCknT9 "Changing values")
3. Again you can check your Mongo Atlas cluster to ensure the update took.
![Updated user](https://imgur.com/UxG7D7X "Updated user")

### Getting back all the customer in the DB
Now that you have a user in the DB we can retrieve them from the db (You will need your Auth token)
1. In Postman set the req type to GET and the route to ```localhost:3000/customers```
![Retrieving users](https://imgur.com/04ksQwS "Retrieving users")
That's it you should have back a list of users in your DB

### Deleting a user
Now that you have too many users in your DB its time to delete them (As always you will need your token)
1. In Postman set the request type to ```Delete``` and the route to ```locahost:3000/customers/id``` (Yup you guessed it the id is the _id of the user)
![Deleting users](https://imgur.com/AhuBbqz "Deleting users")
That's all you need to do to delete a user again check your DB to ensure the user was deleted

##### I hope you enjoy this little application and if you have nay question or comments please feel free to reach out to me.

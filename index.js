/*const express = require("express");
const app = express();
const path = require("path");
const layout = require("express-layout");
const PORT = process.env.PORT || 4000;

//configuration settings
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// require routes .js files necessary
const route = require("./route/app");

// connect views folder with app.set, path.join and setup the view engine using ejs module
//return path string/ address
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(layout());
app.use(express.static("public")); //everything in public is now accessible using / as static files

// connect to database after requiring MongoURI from config/keys.js
const mongoose = require("mongoose");
const db = require("./config/keys").MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("MongoDB connected"))
.catch(err => console.log(err));

//use urlencoded() method to parse body of incoming req object -- > req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);



// use routes
app.use("/", route);

// listen on port code
app.listen(PORT, () => {
  console.log(`index.js server listening on port: ${PORT}`);
});*/

// Imports
const express = require('express')
const app = express()
const routes = require('./routes/app');
//const users = require('./route/users');

app.use(express.urlencoded({extended:true}));
// Static Files
app.use(express.static('public'))
app.set('view engine', 'ejs')

//MongoDB Connection
const mongoose = require("mongoose");
const db = require("./config/keys").MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("MongoDB connected"))
.catch(err => console.log(err));

// Routes
app.use("/", routes);
//app.use("/", users);

// Establishing the port 
const PORT = process.env.PORT || 5000;
// Executing the sever on given port number
app.listen(PORT, console.log(`Server started on port ${PORT}`));
// Imports
const express = require('express')
const app = express()
const routes = require('./routes/app');
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
//nunjucks.configure('views', { express: app })
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
nunjucks.configure('views', { express: app })
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
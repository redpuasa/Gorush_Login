const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { render } = require('ejs');

router.get('/', (req, res) => {
    res.render('signup');
})

router.post('/validation', (req, res) => {  
    console.log(req.body.name)
    //console.log(req.body.address_1)
    //console.log(req.body.paying_2)
    let user = new User({
        Name: req.body.name,
        Password: req.body.password,
        Kampong: req.body.address_1,
        Jalan: req.body.address_2,
        Simpang: req.body.address_3,
        House_Number: req.body.address_4,
        Contact_1: req.body.contact_1,
        Contact_2: req.body.contact_2,
        Bruhims: req.body.bruhims,
        Pay_MOH: req.body.radioMOH,
        Jpmc: req.body.jpmc,
        Pay_JPMC: req.body.radioJPMC,
        Panaga: req.body.panaga,
        Pay_PHC: req.body.radioPHC,
    });
    user.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			title: 'Error page',
                head: 'Username already exist',
                message: 'Please use a different username',
    			href: "signup"
    		});
    	}
    } else {
    	res.render('validation');
    }
    });
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post("/welcome", (req,res) =>{
//use authenticate method here
User.authenticate(req.body.name, req.body.password, (error, user) =>{
 if(error || !user){
res.render("error")
 } else {
res.render("welcome")
 }

})
});

module.exports = router;
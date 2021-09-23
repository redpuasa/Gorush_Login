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
        name: req.body.name,
        password: req.body.password,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        bruhims: req.body.bruhims,
        pay_MOH: req.body.radioMOH,
        jpmc: req.body.jpmc,
        pay_JPMC: req.body.radioJPMC,
        panaga: req.body.panaga,
        pay_PHC: req.body.radioPHC,
    });
    user.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			//title: 'Error page',
                //head: 'Username already exist',
                //message: 'Please use a different username',
    			//href: "signup"
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
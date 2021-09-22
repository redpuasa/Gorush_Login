const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { render } = require('ejs');

router.get('/signup', (req, res) => {
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
        Paying_1: req.body.paying_1,
        Jpmc: req.body.jpmc,
        Paying_2: req.body.paying_2,
        Panaga: req.body.panaga,
        Paying_3: req.body.paying_3,
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

module.exports = router;
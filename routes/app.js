const express = require('express');
const router = express.Router();
const User = require("../models/user");
const MohOrder = require("../models/mohorder")
const { render } = require('ejs');

//let currentUser = {};

router.get('/', (req, res) => {
    res.render('signup');
})

router.post('/login', (req, res) => {  
    req.body.contact_1 = req.body.code + req.body.contact_1;
    req.body.contact_2 = req.body.code_2 + req.body.contact_2;
    console.log(req.body.name)
    console.log(req.body.contact_1)
    console.log(req.body.contact_2)
    console.log(req.body.bruhims)
    let user = new User({
        name: req.body.name,
        icNumber: req.body.icNumber,
        dob: req.body.dob,
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
    			title: 'Error page',
                head: 'Username already exist',
                message: 'Please use a different username',
    			href: "signup"
    		});
    	}
    } else {
    	res.render('login');
    }
    });
})

/*router.get('/login', (req, res) => {
    res.render('login');
})*/

router.post("/dashboard", (req,res) =>{
//use authenticate method here
User.authenticate(req.body.contact_1, req.body.password, (error, user) =>{
        if(!error || user){
            res.render("dash", {
                contact_1:req.body.contact_1,
                name: user.name,
                icNumber: user.icNumber,
                dob: user.dob,
                kampong: user.kampong,
                jalan: user.jalan,
                simpang: user.simpang,
                house_Number: user.house_Number,
                contact_2: user.contact_2,
                bruhims: user.bruhims,
                pay_MOH: user.pay_MOH,
                jpmc: user.jpmc,
                pay_JPMC: user.radioJPMC,
                panaga: user.panaga,
                pay_PHC: user.radioPHC,
            })
        } else {
            res.render("error")
        }

    })
});

router.post('/orderconfirmed', (req, res) => {  
    console.log(req.body.name)
    console.log(req.body.bruhims)
    let order = new MohOrder({
        name: req.body.name,
        icNumber: req.body.icNumber,
        bruhims: req.body.bruhims,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.qo,
        tod: req.body.tod,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
        dateSubmit: req.body.dateSubmit,
    });
    order.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			title: 'Error page',
                head: 'Invalid Order',
                message: 'Please try again',
    			href: "signup"
    		});
    	}
    } else {
    	res.render('error');
    }
    });
})

router.get('/mohorder', (req, res) => {
    res.render('mohorder',{
        //name: user.name,
        //contact_1: user.contact_1,
    });
})

module.exports = router;
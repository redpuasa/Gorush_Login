const express = require('express');
const Vonage = require('@vonage/server-sdk')
const vonage = new Vonage({
    apiKey: "1c18ab21",
    apiSecret: "dfvQQWqrmidr8B1m"
})
const router = express.Router();
const User = require("../models/user");
const stdMohOrder = require("../models/mohorder_std")
const expMohOrder = require("../models/mohorder_exp")
const imeMohOrder = require("../models/mohorder_ime")
const scMohOrder = require("../models/mohorder_sc")
const stdJpmcOrder = require("../models/jpmcorder_std")
const expJpmcOrder = require("../models/jpmcorder_exp")
const scJpmcOrder = require("../models/jpmcorder_sc")
const stdPhcOrder = require("../models/phcorder_std")
const { render } = require('ejs');

//let userList = [];
let currentUser = {};

router.get('/', (req, res) => {
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/mohorder', (req, res) => {
    res.render('mohorder',{
        name: currentUser.name,
        icNumber: currentUser.icNumber,
        dob: currentUser.dob,
        kampong: currentUser.kampong,
        jalan: currentUser.jalan,
        simpang: currentUser.simpang,
        house_Number: currentUser.house_Number,
        contact_1: currentUser.contact_1,
        contact_2: currentUser.contact_2,
        bruhims: currentUser.bruhims,
    });
})

router.get('/jpmcorder', (req, res) => {
    res.render('jpmcorder',{
        name: currentUser.name,
        icNumber: currentUser.icNumber,
        dob: currentUser.dob,
        kampong: currentUser.kampong,
        jalan: currentUser.jalan,
        simpang: currentUser.simpang,
        house_Number: currentUser.house_Number,
        contact_1: currentUser.contact_1,
        contact_2: currentUser.contact_2,
        jpmc: currentUser.jpmc,
    });
})



router.get('/phcorder', (req, res) => {
    res.render('phcorder',{
        name: currentUser.name,
        icNumber: currentUser.icNumber,
        dob: currentUser.dob,
        kampong: currentUser.kampong,
        jalan: currentUser.jalan,
        simpang: currentUser.simpang,
        house_Number: currentUser.house_Number,
        contact_1: currentUser.contact_1,
        contact_2: currentUser.contact_2,
        panaga: currentUser.panaga,
    });
})

router.post('/validation', (req, res) => {  
    if(req.body.formMethod === "signup"){
        postSignUp(req,res)
    }
})

router.post("/dashboard", (req,res) =>{
    if(req.body.formMethod === "Login"){
        postLogin(req,res)
    }
});

router.post('/confirm', (req, res) => {  
    if(req.body.formMethod === "MOHOrder"){
        console.log(req.body.tod)
        if(req.body.tod === "Standard"){
            standardMOH(req,res);
        }else if(req.body.tod === "Express"){
            expressMOH(req,res);
        }else if(req.body.tod === "Immediate"){
            immediateMOH(req,res);
        }else if(req.body.tod === "Self-Collect"){
            selfMOH(req,res);
        }
    }else if(req.body.formMethod === "JPMCOrder"){
        if(req.body.tod === "Standard"){
            standardJPMC(req,res);
        }else if(req.body.tod === "Express"){
            expressJPMC(req,res);
        }else if(req.body.tod === "Self-Collect"){
            selfJPMC(req,res);
        }
    }else if(req.body.formMethod === "PHCOrder"){
        if(req.body.tod === "Standard"){
            standardPHC(req,res);
        }
    }
})

function postSignUp(res,req){
    req.body.contact_1 = req.body.code + req.body.contact_1;
    req.body.contact_2 = req.body.code_2 + req.body.contact_2;
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
    	res.render('validation');
    }
    });
}

function postLogin(req,res){
    User.authenticate(req.body.contact_1, req.body.password, (error, user) =>{
        if(!error || user){
            let success = false;
            //userList= [];
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
            currentUser = user;
            success = true;
            //console.log(userList);
            console.log(currentUser)
        } else {
            res.render("error")
        }  
    })   
}

function standardMOH(req,res){
    let smorder = new stdMohOrder({
        name: currentUser.name,
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
    });
    smorder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}

function expressMOH(req,res){
    let emorder = new expMohOrder({
        name: currentUser.name,
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
    });
    emorder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}

function immediateMOH(req,res){
    let imorder = new imeMohOrder({
        name: currentUser.name,
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
    });
    imorder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}

function selfMOH(req,res){
    let scmorder = new scMohOrder({
        name: currentUser.name,
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
    });
    scmorder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}

function standardJPMC(req,res){
    let sjorder = new stdJpmcOrder({
        name: currentUser.name,
        icNumber: req.body.icNumber,
        jpmc: req.body.jpmc,
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
    });
    sjorder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}

function expressJPMC(req,res){
    let ejorder = new expJpmcOrder({
        name: currentUser.name,
        icNumber: req.body.icNumber,
        jpmc: req.body.jpmc,
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
    });
    ejorder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}

function selfJPMC(req,res){
    let scjorder = new scJpmcOrder({
        name: currentUser.name,
        icNumber: req.body.icNumber,
        jpmc: req.body.jpmc,
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
    });
    scjorder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}

function standardPHC(req,res){
    let sporder = new stdPhcOrder({
        name: currentUser.name,
        icNumber: req.body.icNumber,
        jpmc: req.body.jpmc,
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
    });
    sporder.save(function (err) {
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
    	res.render('confirm');
    }
    });
}



module.exports = router;
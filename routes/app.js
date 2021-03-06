const express = require('express');
const Vonage = require('@vonage/server-sdk')
const bcrypt = require("bcrypt");
const vonage = new Vonage({
    //apiKey:"6632d882",
    //apiSecret:"xqgTRoO9d94EdSTa"
    apiKey: "1c18ab21",
    apiSecret: "dfvQQWqrmidr8B1m"
})
const router = express.Router();
const User = require("../models/user")
const Patient = require("../models/patient")
const stdMohOrder = require("../models/mohorder_std")
const expMohOrder = require("../models/mohorder_exp")
const imeMohOrder = require("../models/mohorder_ime")
const scMohOrder = require("../models/mohorder_sc")
const stdJpmcOrder = require("../models/jpmcorder_std")
const expJpmcOrder = require("../models/jpmcorder_exp")
const scJpmcOrder = require("../models/jpmcorder_sc")
const stdPhcOrder = require("../models/phcorder_std")
const scPhcOrder = require("../models/phcorder_sc")
const { render } = require('ejs');
const { request } = require('express');

let currentUser = {};
//let currentPatient = {};
let patientList= [];


router.get('/', (req, res) => {
    res.render('signup');
})

router.get('/logout', (req,res) => {
    res.render('www.gorushbn.com')
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/addition', (req,res) => {
    console.log(currentUser._id)
    res.render('addition',{
        userID: currentUser._id,
    });
})

router.get('/forgotPass', (req,res) =>{
    res.render('forgotPass');
})

router.post('/changePass', (req,res) =>{
    let contact_1 = req.body.contact_1
    vonage.verify.check({
        request_id: req.body.requestId,
        code: req.body.code_vn,
    }, (error,result) => {
        console.log(contact_1)
        if(result.status != 0){
            res.render('error')
            console.log(result.status)
        }else{    
            console.log(result.status)
            User.findOne({contact_1: contact_1}, (error, user)=>{
                if (user){
                    res.render('changePass', { 
                        requestId: result.request_id, 
                        contact_1: contact_1,
                        userID: user._id,
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
                        pay_JPMC: user.pay_JPMC,
                        panaga: user.panaga,
                        pay_PHC: user.pay_PHC,
                    })
                    jsonString = JSON.stringify(user);
                    console.log(jsonString)
                }else{
                    res.render('error')
                }
            })
        }
    })
    console.log(contact_1) 
})

router.post("/validationPass", (req,res)=> {
    let contact_1 = req.body.code + req.body.contact_1
    console.log(contact_1)
    vonage.verify.request({
        number: contact_1,//change to user.contact_1
        brand: "Go Rush"
    }, (err,result) => {
        console.log(result.status)
        if(result.status != 0){
            res.render("error")
        }else{
            res.render('validationPass', { 
                requestId: result.request_id, 
                contact_1: contact_1,
            })
        }
    })
})

router.post('/changeConfirm', (req,res) =>{
    console.log(req.body.name)
    let password = req.body.password
    let id = req.body.userID
    console.log(req.body.status)
    bcrypt.hash(password, 10, (err, hash)=>{
        if(err) throw error
        req.body.password = hash
        console.log(req.body.password)
        User.findByIdAndUpdate({_id: id},{
            password: req.body.password, 
            status:req.body.status
        }, (error, user)=>{
            if(error) throw error
            else res.render('login')
        })
        console.log(req.body.status)
    })
})

router.post('/addconfirm', (req,res) =>{
    let patient = new Patient({
        userID: req.body.userID,
        name: req.body.name,
        icNumber: req.body.icNumber,
        bruhims: req.body.bruhims,
        pay_MOH: req.body.radioMOH,
        jpmc: req.body.jpmc,
        pay_JPMC: req.body.radioJPMC,
        panaga: req.body.panaga,
        pay_PHC: req.body.radioPHC,
    });
    patient.save(function (err) {
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
    	res.render('addconfirm');
    }
    });
})

router.get('/mohorder', (req, res) => {
    res.render('mohorder',{
        name: currentUser.name,
        icNumber: currentUser.icNumber,
        passport: currentUser.passport,
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
        userID :currentUser._id,
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
    })
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
    req.body.contact_1 = req.body.code + req.body.contact_1;
    req.body.contact_2 = req.body.code_2 + req.body.contact_2;
    console.log(req.body.name)
    console.log()
    let user = new User({
        name: req.body.name,
        icNumber: req.body.icNumber,
        passport: req.body.passport,
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
        status: req.body.status,
    });
    user.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_User_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "signup"
    		});
    	}
    }else {
        vonage.verify.request({
            number: user.contact_1,//change to user.contact_1
            brand: "Go Rush"
        }, (err,result) => {
            console.log(result.status)
            if(result.status != 0){
                res.render("error")
            }else{
                res.render('validation', { requestId: result.request_id, contact_1: user.contact_1 })
            }
        })
        console.log(user.contact_1)
    }
    });
})

router.post("/login", (req,res) =>{
    vonage.verify.check({
        request_id: req.body.requestId,
        code: req.body.code,
    }, (err,result) => {
        console.log(req.body.contact_1)
        if(result.status != 0){
            res.render('error')
        }else{
            User.findOneAndUpdate({contact_1: req.body.contact_1}, {status: req.body.status}, (err,docs) => {
                if(err){
                    console.log(err)
                    res.render('error')
                } 
                else {
                    console.log(req.body.status)
                    res.render('login')
                }
            })
        }
    })
})

router.post("/dashboard", (req,res) =>{
    let contact_1 = req.body.code + req.body.contact_1
    User.authenticate(contact_1, req.body.password, (error, user) =>{
        patientList = [];
        Patient.find({}, (error, patients) =>{
            patients.forEach(function(patient){
                patientList.push(patient)
                })
        let status = user.status;
        console.log(user)
        if(status === "Active"){
            if(!error || user){
                res.render("dash", {
                    contact_1:contact_1,
                    userID: user._id,
                    name: user.name,
                    icNumber: user.icNumber,
                    passport: user.passport,
                    dob: user.dob,
                    kampong: user.kampong,
                    jalan: user.jalan,
                    simpang: user.simpang,
                    house_Number: user.house_Number,
                    contact_2: user.contact_2,
                    bruhims: user.bruhims,
                    pay_MOH: user.pay_MOH,
                    jpmc: user.jpmc,
                    pay_JPMC: user.pay_JPMC,
                    panaga: user.panaga,
                    pay_PHC: user.pay_PHC,
                    patient: patientList,
                })
                //console.log(currentUser)
                //console.log(patientList)
                //currentPatient = patientList
                //console.log (patientList)
                currentUser = user;
            }else {
                res.render("error")
            }  
        }else {
            res.render('error')
        }
        })
    })
});

router.post('/confirm', (req, res) => {  
    if(req.body.formMethod === "MOHOrder"){
        console.log(req.body.radioTOD)
        if(req.body.radioTOD === "Standard"){
            standardMOH(req,res);
        }else if(req.body.radioTOD === "Express"){
            expressMOH(req,res);
        }else if(req.body.radioTOD === "Immediate"){
            immediateMOH(req,res);
        }else if(req.body.radioTOD === "Self-Collect"){
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
        else if(req.body.tod === "Self-Collect"){
            selfPHC(req,res);
        }
    }
})

router.get('/edit', (req,res) => {
    console.log(currentUser.name)
    res.render('edit',{
        name: currentUser.name,
        icNumber: currentUser.icNumber,
        dob: currentUser.dob,
    })
})

router.post('/editconfirm', (req,res) => {
    console.log(req.body.name)
    console.log(currentUser._id)
    User.findByIdAndUpdate({_id: currentUser._id}, {
        name: req.body.name,
        icNumber: req.body.icNumber,
        dob: req.body.dob,
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
    }, (err,users) => {
        if(err){
            console.log(err)
            res.render('error')
        } 
        else res.render('editconfirm')
    })
})

function standardMOH(req,res){
    let smorder = new stdMohOrder({
        name: currentUser.name,
        icNumber: req.body.icNumber,
        passport: req.body.passport,
        bruhims: req.body.bruhims,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioDistrict: req.body.radioDistrict,
        BNHC: req.body.BNHC,
        TUHC: req.body.TUHC,
        TEHC: req.body.TEHC,
        BHC: req.body.BHC,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    smorder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
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
        passport: req.body.passport,
        bruhims: req.body.bruhims,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioDistrict: req.body.radioDistrict,
        BNHC: req.body.BNHC,
        TUHC: req.body.TUHC,
        TEHC: req.body.TEHC,
        BHC: req.body.BHC,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    emorder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
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
        passport: req.body.passport,
        bruhims: req.body.bruhims,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioDistrict: req.body.radioDistrict,
        BNHC: req.body.BNHC,
        TUHC: req.body.TUHC,
        TEHC: req.body.TEHC,
        BHC: req.body.BHC,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    imorder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
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
        passport: req.body.passport,
        bruhims: req.body.bruhims,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioDistrict: req.body.radioDistrict,
        BNHC: req.body.BNHC,
        TUHC: req.body.TUHC,
        TEHC: req.body.TEHC,
        BHC: req.body.BHC,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    scmorder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
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
        passport: req.body.passport,
        jpmc: req.body.jpmc,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    sjorder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
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
        passport: req.body.passport,
        jpmc: req.body.jpmc,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    ejorder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
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
        passport: req.body.passport,
        jpmc: req.body.jpmc,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    scjorder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
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
        passport: req.body.passport,
        panaga: req.body.panaga,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    sporder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
    		});
    	}
    } else {
    	res.render('confirm');
    }
    });
}

function selfPHC(req,res){
    let scporder = new scPhcOrder({
        name: currentUser.name,
        icNumber: req.body.icNumber,
        passport: req.body.passport,
        panaga: req.body.panaga,
        kampong: req.body.address_1,
        jalan: req.body.address_2,
        simpang: req.body.address_3,
        house_Number: req.body.address_4,
        contact_1: req.body.contact_1,
        contact_2: req.body.contact_2,
        qo: req.body.radioQO,
        radioNOTI: req.body.radioNOTI,
        radioDURATION: req.body.radioDURATION,
        radioTOD: req.body.radioTOD,
        pm: req.body.pm,
        re: req.body.re,
        dateSC: req.body.dateSC,
    });
    scporder.save(function (err) {
    if (err) {
    	if (err.name === "MongoError" && err.code === 11000) {
    		res.render('error', {
    			error_code: '11000',
                head: 'Invalid_Order_MongoError-11000',
                message: 'Please logout and try again. If the error still persist, please contact our customer support +6732332065 via WhatsApp',
    			href: "login"
    		});
    	}
    } else {
    	res.render('confirm');
    }
    });
}

module.exports = router;
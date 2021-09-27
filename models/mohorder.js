const mongoose = require("mongoose");

const MohOrderSchema  = new mongoose.Schema({
    bruhims:{
        type: String,
        trim: true
    },
    name:{
        type: String,
    },
    icNumber:{
        type: String,
    },
    address:{
        type: String,
    },
    contact_1:{
        type: String,
    },
    Contact_2:{
        type: String,
    },
    dob:{
        type: Date,
    },
    qo:{
        type: String,
    },
    tod:{
        type: String,
    },
    pm:{
        type: String,
    },
    re:{
        type: String,
    },
    dateSubmit:{
        type: Date,
    },
    dateSc:{
        type: Date,
    }
});

const MohOrder = mongoose.model("MohOrder", MohOrderSchema); 
module.exports = MohOrder;
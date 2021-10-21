const mongoose = require("mongoose");
const std_MohOrderSchema  = new mongoose.Schema({
    bruhims:{
        type: String,
        trim: true
    },
    name:{
        type: String,
        trim: true,
    },
    icNumber:{
        type: String,
    },
    passport:{
        type: String,
    },
    kampong:{
        type: String,
        required: true,
        trim: true
    },
    jalan:{
        type: String,
        required: true,
        trim: true
    },
    simpang:{
        type: String,
        required: true,
        trim: true
    },
    house_Number:{
        type: String,
        required: true,
        trim: true
    },
    contact_1:{
        type: String,
    },
    Contact_2:{
        type: String,
    },
    dob:{
        type: String,
    },
    qo:{
        type: String,
    },
    radioTOD:{
        type: String,
    },
    doctor:{
        type: String,
    },
    radioDistrict:{
        type: String,
    },
    pm:{
        type: String,
    },
    re:{
        type: String,
    },
    radioNoti:{
        type: String,
    },
    radioDuration:{
        type: String,
    },
    dateSubmit:{
        type: Date,
        default: Date.now() + 8*60*60*1000, //+8 hours according to Brunei Time
    },
});

const std_MohOrder = mongoose.model("std_MohOrder", std_MohOrderSchema); 
module.exports = std_MohOrder;
const mongoose = require("mongoose");

const PatientSchema  = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    },
    icNumber:{
        type: String,
    },
    passport:{
        type: String,
    },
    dob:{
        type: String
    },
    bruhims:{
        type: String,
        trim: true
    },
    pay_MOH:{
        type: String,
    },
    jpmc:{
        type: String,
        trim: true
    },
    pay_JPMC:{
        type: String,
    },
    panaga:{
        type: String,
        trim: true
    },
    pay_PHC:{
        type: String,
    },
    userID:{
        type: String,
    }
});

const Patient = mongoose.model("Patient", PatientSchema); 
module.exports = Patient;
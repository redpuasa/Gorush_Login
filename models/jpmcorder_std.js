const mongoose = require("mongoose");
const std_JpmcOrderSchema  = new mongoose.Schema({
    jpmc:{
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
        type: String,
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
        default: Date.now() + 8*60*60*1000, //+8 hours according to Brunei Time
    },
});

const std_JpmcOrder = mongoose.model("std_JpmcOrder", std_JpmcOrderSchema); 
module.exports = std_JpmcOrder;
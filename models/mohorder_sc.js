const mongoose = require("mongoose");
const sc_MohOrderSchema  = new mongoose.Schema({
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
    dateSc:{
        type: String,
    }
});

const sc_MohOrder = mongoose.model("sc_MohOrder", sc_MohOrderSchema); 
module.exports = sc_MohOrder;
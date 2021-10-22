const mongoose = require("mongoose");
const exp_JpmcOrderSchema  = new mongoose.Schema({
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
    pm:{
        type: String,
    },
    re:{
        type: String,
    },
    radioNOTI:{
        type: String,
    },
    radioDURATION:{
        type: String,
    },
    scDate:{
        type: String,
    },
    dateSubmit:{
        type: Date,
        default: Date.now() + 8*60*60*1000, //+8 hours according to Brunei Time
    },
});

const exp_JpmcOrder = mongoose.model("exp_JpmcOrder", exp_JpmcOrderSchema); 
module.exports = exp_JpmcOrder;
const mongoose = require("mongoose");

const OrderSchema  = new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    bruhims:{
        type: String,
        trim: true,
    },
    qo: {
        type: String,
    },
    icNumber:{
        type: String,
    },
    dob: {
        type: String,
        trim: true,
    },
    tod:{
        type: String,
        trim: true,
    },
    pm:{
        type: String,
        trim: true,
    },
    address:{
        type: String,
        trim: true,
    },
    dateSubmit:{
        type: Date,
        default: () => Date.now() //+ 3*60*60*1000 // 3 hours from now
    },
    dateSC:{
        type: Date,
    },
    remark:{
        type: String,
    },
    contact_1:{
        type: String,
    },
    contact_2:{
        type: String,
    },
});


const Order = mongoose.model("Order", OrderSchema); 
module.exports = Order;
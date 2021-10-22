const mongoose = require("mongoose");
const std_PanagaOrderSchema  = new mongoose.Schema({
    panaga:{
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

const std_PanagaOrder = mongoose.model("std_PanagaOrder", std_PanagaOrderSchema); 
module.exports = std_PanagaOrder;
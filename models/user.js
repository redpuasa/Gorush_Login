const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema  = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    icNumber:{
        type: String,
    },
    dob:{
        type: Date
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
        type: Number,
		required: true,
		trim: true,
    },
    contact_2:{
        type: Number,
		trim: true,
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
    }
});

UserSchema.statics.authenticate = function(contact_1, password, callback){
 User.findOne({
     contact_1:contact_1
 }).exec(function(error,user){
     if(error){
         console.log(error)
     } else if(!user){
         var err = new Error("User not found");
         err.status = 401;
         console.log(err);
     }// if user exists
     bcrypt.compare(password, user.password, function(error,result){
         if(result === true){
             return callback(null, user);
         } else {
             return callback()
         }
     })
 })

}

UserSchema.pre("save", function(next){
    const user  = this;
    bcrypt.hash(user.password, 10,(err, hash)=>{
        if(err){
            return next();
        }
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema); 
module.exports = User;
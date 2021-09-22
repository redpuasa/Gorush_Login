const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema  = new mongoose.Schema({
    Name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
    Kampong:{
        type: String,
        required: true,
        trim: true
    },
    Jalan:{
        type: String,
        required: true,
        trim: true
    },
    Simpang:{
        type: String,
        required: true,
        trim: true
    },
    House_Number:{
        type: String,
        required: true,
        trim: true
    },
    Contact_1:{
        type: String,
        required: true,
        trim: true
    },
    Contact_2:{
        type: String,
        trim: true
    },
    
    Bruhims:{
        type: String,
        trim: true
    },
    Pay_MOH:{
        type: String,
    },
    Jpmc:{
        type: String,
        trim: true
    },
    Pay_JPMC:{
        type: String,
    },
    Panaga:{
        type: String,
        trim: true
    },
    Pay_PHC:{
        type: String,
    }
});

UserSchema.statics.authenticate = function(name, password, callback){
 User.findOne({
     name:name
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
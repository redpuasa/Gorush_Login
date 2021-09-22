const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

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
        unique: true,
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
    Paying_1:{
        type: String,
    },
    Jpmc:{
        type: String,
        trim: true
    },
    Paying_2:{
        type: String,
    },
    Panaga:{
        type: String,
        trim: true
    },
    Paying_3:{
        type: String,
    }
});

/*
UserSchema.statics.authenticate = function(Name, Password, callback){
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
     bcrypt.compare(Password, user.Password, function(error,result){
         if(result === true){
             return callback(null, user);
         } else {
             return callback()
         }
     })
 })

}

/*
UserSchema.pre("save", function(next){
const self = this;
User.find({
 name: self.name
}, function(err, docs){
    if(!docs.length){
        next();
    } else{
        console.log("user exists", self.name);
        next();
    }
})
})
*/
/*
UserSchema.pre("save", function(next){
    const user  = this;
    bcrypt.hash(user.Password, 10,(err, hash)=>{
        if(err){
            return next();
        }
        user.Password = hash;
        next();
    });
});
*/

const User = mongoose.model("User", UserSchema); 
module.exports = User;
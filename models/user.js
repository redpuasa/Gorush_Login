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
        minlength : 8,
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
        required: true,
        trim: true
    },
    Pharmacy:{
        type: Boolean,
        required: true,
        trim: true
    },
    Bruhims:{
        type: String,
        required: true,
        trim: true
    },
    Paying_1:{
        type: Boolean,
        required: true,
        trim: true
    },
    Jpmc:{
        type: String,
        required: true,
        trim: true
    },
    Paying_2:{
        type: Boolean,
        required: true,
        trim: true
    },
    Panaga:{
        type: String,
        required: true,
        trim: true
    },
    Paying_3:{
        type: Boolean,
        required: true,
        trim: true
    },
    Zalora:{
        type: Boolean,
        required: true,
        trim: true
    },
    LocalDeli:{
        type: Boolean,
        required: true,
        trim: true
    },
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


const User = mongoose.model("User", UserSchema); //create a mongoose model based on UserSchema 
//and call it User and save it as a variable called User. Nice
module.exports = User;
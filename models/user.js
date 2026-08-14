const mongoose = require("mongoose");      //Used to create MongoDB Schem and Models
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);  //Adds Username, Hash, Salt and authentication methods automatically.


const User = mongoose.model("User", userSchema);
module.exports = User;